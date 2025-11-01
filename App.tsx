import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreatorForm from "./components/CreatorForm";
import ReflectionForm from "./components/ReflectionForm";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreatorForm />} />
        <Route path="/heartnote/:id" element={<ReflectionForm />} />
      </Routes>
    </Router>
  );
}
