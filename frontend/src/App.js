import "./styles.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import SubmissionPage from "./pages/SubmissionPage";
import InfrastructureSlow from "./pages/InfrastructureSlow";
import CS1231_1 from "./pages/CS1231_1";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/submission" element={<SubmissionPage />} />
        <Route path="/infrastructureslow" element={<InfrastructureSlow />} />
        <Route path="/cs1231_1" element={<CS1231_1 />} />
      </Routes>
    </>
  );
}
