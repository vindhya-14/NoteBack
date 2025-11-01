import { useParams } from "react-router-dom";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import emailjs from "emailjs-com";

export default function ReflectionForm() {
  const { id } = useParams<{ id: string }>();
  const [toEmail, setToEmail] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [progress, setProgress] = useState(0);

  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    question_1: "",
    question_2: "",
    question_3: "",
    question_4: "",
    question_5: "",
    question_6: "",
    question_7: "",
    question_8: "",
    question_9: "",
    question_10: "",
  });

  useEffect(() => {
    if (id) {
      try {
        const decoded = atob(id);
        const email = decoded.split("-")[0];
        setToEmail(email);
      } catch (err) {
        console.error("Invalid link");
      }
    }
  }, [id]);

  useEffect(() => {
    setProgress((currentQuestion / questions.length) * 100);
  }, [currentQuestion]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!toEmail) return alert("Invalid or expired link");

    setIsSubmitting(true);
    setStatus("Sending your reflection...");

    try {
      await emailjs.send(
        (import.meta as any).env.VITE_EMAILJS_SERVICE_ID!,
        (import.meta as any).env.VITE_EMAILJS_TEMPLATE_ID!,
        {
          ...formData,
          to_email: toEmail,
          submission_date: new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        },
        (import.meta as any).env.VITE_EMAILJS_PUBLIC_KEY!
      );

      setStatus("success");
      setTimeout(() => {
        setStatus("");
      }, 5000);
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const questions = [
    {
      question: "Which three words best capture my essence or personality?",
      placeholder: "E.g., compassionate, curious, determined...",
      category: "Essence & Personality",
    },
    {
      question: "What is an achievement of mine that genuinely made you proud?",
      placeholder: "Think of a time I accomplished something meaningful...",
      category: "Proud Moments",
    },
    {
      question:
        "What personal quality of mine do you find most admirable, and why?",
      placeholder: "Reflect on traits that stand out to you...",
      category: "Admirable Qualities",
    },
    {
      question:
        "Is there a moment we shared that you often think about? Why does it stand out to you?",
      placeholder: "Describe a memory that felt special or meaningful...",
      category: "Memorable Moments",
    },
    {
      question: "In what ways do you think I can grow or develop further?",
      placeholder: "Share any gentle advice or areas for growth...",
      category: "Growth & Development",
    },
    {
      question: "How do our conversations impact your mood or perspective?",
      placeholder: "Do they uplift, inspire, challenge, or comfort you?",
      category: "Conversations & Connection",
    },
    {
      question: "What habits or attitudes of mine do you find inspiring?",
      placeholder: "Something about my mindset, discipline, or values...",
      category: "Inspiring Traits",
    },
    {
      question:
        "Is there a song or piece of music that brings you memories of our relationship or time together?",
      placeholder: "Share the song and why it connects to us...",
      category: "Music & Memories",
    },
    {
      question:
        "If you could compare me to any character from a book, TV show, or movie, who would it be, and what’s the reason?",
      placeholder: "Be creative — what makes this comparison fitting?",
      category: "Character Comparison",
    },
    {
      question:
        "Is there anything you wish I knew about how I affect your life, or any advice you’d want to give for my journey ahead?",
      placeholder: "This is your space to share any final reflections...",
      category: "Final Reflections",
    },
  ];

  const renderQuestion = (index: number) => (
    <div key={index} className="space-y-4 animate-fade-in">
      <div className="flex items-center gap-2 text-sm font-medium text-blue-600 mb-2">
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        <span>{questions[index].category}</span>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 leading-relaxed">
        {questions[index].question}
      </h3>

      <textarea
        name={`question_${index + 1}`}
        value={formData[`question_${index + 1}` as keyof typeof formData] || ""}
        onChange={handleChange}
        required
        rows={4}
        placeholder={questions[index].placeholder}
        className="w-full border border-gray-300 rounded-xl p-4 focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 resize-none bg-white/50 backdrop-blur-sm shadow-sm"
      />
    </div>
  );

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat py-8 px-4"
      style={{
        backgroundImage:
          "url('https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm00MjItMDczLWt6cGhnMjR1LmpwZw.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8 bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-semibold text-blue-600">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              NoteBack Reflection
            </h1>
            <p className="text-blue-100 text-lg">
              Share your thoughtful feedback
            </p>
          </div>

          <div className="p-8">
            {/* Sender Info */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 items-center gap-2">
                  Your Name
                </label>
                <input
                  required
                  type="text"
                  name="from_name"
                  placeholder="Enter your name"
                  value={formData.from_name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 bg-white/50 backdrop-blur-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 items-center gap-2">
                  Your Email
                </label>
                <input
                  required
                  type="email"
                  name="from_email"
                  placeholder="your.email@example.com"
                  value={formData.from_email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 bg-white/50 backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Question Navigator */}
            <div className="flex items-center justify-between mb-6">
              <button
                type="button"
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className="text-gray-600 hover:text-blue-600 disabled:text-gray-400"
              >
                ← Previous
              </button>

              <div className="flex items-center gap-2">
                {questions.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentQuestion(i)}
                    className={`w-3 h-3 rounded-full ${
                      currentQuestion === i
                        ? "bg-blue-500 scale-125"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={nextQuestion}
                disabled={currentQuestion === questions.length - 1}
                className="text-gray-600 hover:text-blue-600 disabled:text-gray-400"
              >
                Next →
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {renderQuestion(currentQuestion)}

              <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
                {currentQuestion === questions.length - 1 ? (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:scale-[1.02] transition-all"
                  >
                    {isSubmitting ? "Sending..." : "Send Complete Reflection"}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={nextQuestion}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:scale-[1.02] transition-all"
                  >
                    Continue to Next Question →
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setCurrentQuestion(0)}
                  className="px-6 py-4 border border-gray-300 text-gray-600 rounded-xl hover:bg-gray-50"
                >
                  Restart
                </button>
              </div>
            </form>

            {status === "success" && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl text-center">
                ✅ Reflection Sent Successfully! Thank you for sharing.
              </div>
            )}
            {status === "error" && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-center">
                ❌ Failed to Send. Please try again later.
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-center text-white/80 text-sm">
          🔒 Your responses are anonymous and secure
        </div>
      </div>
    </div>
  );
}
