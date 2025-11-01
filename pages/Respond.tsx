import { useParams } from "react-router-dom";
import ReflectionForm from "../components/ReflectionForm";

export default function Respond() {
  const { id } = useParams();
  const decodedEmail = atob(id).split("-")[0]; 
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
      <ReflectionForm email={decodedEmail} />
    </div>
  );
}
