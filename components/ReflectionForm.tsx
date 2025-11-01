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
      question:
        "Looking back, what would you say are my most significant strengths or qualities that stood out to you?",
      placeholder: "Think about moments where you saw me at my best...",
      category: "Strengths & Qualities",
    },
    {
      question:
        "What's something you believe I should continue doing because it creates positive impact?",
      placeholder:
        "Consider habits, approaches, or behaviors that work well...",
      category: "Continue Doing",
    },
    {
      question:
        "Is there anything you think I should consider changing or improving? Please be honest but kind.",
      placeholder:
        "Focus on specific behaviors or patterns that could be refined...",
      category: "Improve/Change",
    },
    {
      question:
        "Reflecting on our interactions, what's a specific moment or memory that you particularly valued?",
      placeholder: "Describe why this moment was meaningful to you...",
      category: "Valued Moments",
    },
    {
      question:
        "How would you describe the impact I have on others or the environment around me?",
      placeholder:
        "Think about the ripple effects of my actions or presence...",
      category: "Impact",
    },
    {
      question:
        "What's something you wish I knew about myself from your perspective?",
      placeholder:
        "This could be a strength I underestimate or a blind spot...",
      category: "Perspective",
    },
    {
      question:
        "If you were to give me one piece of advice for my future growth, what would it be?",
      placeholder: "Think long-term development and potential...",
      category: "Growth Advice",
    },
    {
      question: "What do you see as my unique contribution or special gift?",
      placeholder: "What makes my presence or work distinctive...",
      category: "Unique Contribution",
    },
    {
      question:
        "How have you seen me handle challenges, and what did that reveal about my character?",
      placeholder: "Reflect on difficult situations you've observed...",
      category: "Resilience",
    },
    {
      question:
        "Is there anything else you'd like to share that hasn't been covered? Any final thoughts or appreciation?",
      placeholder: "This is your space for anything additional...",
      category: "Closing Thoughts",
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
      {/* Overlay */}
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
          {/* Header */}
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
              Share your thoughtful feedback anonymously
            </p>
          </div>

          <div className="p-8">
            {/* Sender Info */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 items-center gap-2">
                  <svg
                    className="w-4 h-4 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  name="from_name"
                  placeholder="Enter your name or stay anonymous"
                  value={formData.from_name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 bg-white/50 backdrop-blur-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 items-center gap-2">
                  <svg
                    className="w-4 h-4 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Your Email (Optional)
                </label>
                <input
                  type="email"
                  name="from_email"
                  placeholder="your.email@example.com"
                  value={formData.from_email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 bg-white/50 backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Questions Navigation */}
            <div className="flex items-center justify-between mb-6">
              <button
                type="button"
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed hover:text-blue-600 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous
              </button>

              <div className="flex items-center gap-2">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentQuestion(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      currentQuestion === index
                        ? "bg-blue-500 scale-125"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={nextQuestion}
                disabled={currentQuestion === questions.length - 1}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed hover:text-blue-600 transition-colors"
              >
                Next
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Current Question */}
              {renderQuestion(currentQuestion)}

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
                {currentQuestion === questions.length - 1 ? (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending Your Reflection...
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5 transform group-hover:scale-110 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                        Send Complete Reflection
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={nextQuestion}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                  >
                    Continue to Next Question
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setCurrentQuestion(0)}
                  className="px-6 py-4 border border-gray-300 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors font-medium"
                >
                  Restart
                </button>
              </div>
            </form>

            {/* Status Messages */}
            {status === "success" && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl text-center animate-fade-in">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-green-800 font-bold text-lg mb-1">
                  Reflection Sent Successfully!
                </h3>
                <p className="text-green-600">
                  Thank you for sharing your thoughtful feedback.
                </p>
              </div>
            )}

            {status === "error" && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-center animate-fade-in">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-red-800 font-bold text-lg mb-1">
                  Failed to Send
                </h3>
                <p className="text-red-600">
                  Please try again or check your connection.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-sm text-white/80 flex items-center justify-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Your responses are anonymous and secure
          </p>
        </div>
      </div>
    </div>
  );
}
