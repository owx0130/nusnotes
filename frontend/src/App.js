import "./styles.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import SubmissionPage from "./pages/SubmissionPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/submission" element={<SubmissionPage />} />
      </Routes>
    </>
  );
}
