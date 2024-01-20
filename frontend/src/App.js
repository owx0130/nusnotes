import "./styles.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import SubmissionPage from "./pages/SubmissionPage";
import CS1231 from "./pages/CS1231";
import CG2023 from "./pages/CG2023";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/submission" element={<SubmissionPage />} />
        <Route path="/CS1231" element={<CS1231 />} />
        <Route path="/CG2023" element={<CG2023 />} />
      </Routes>
    </>
  );
}
