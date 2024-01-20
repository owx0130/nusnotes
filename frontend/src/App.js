import "./styles.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import SubmissionPage from "./pages/SubmissionPage";
import InfrastructureSlow from "./pages/InfrastructureSlow";
import CS1231_1 from "./pages/CS1231_1";
import CS1231_2 from "./pages/CS1231_2";
import CG2023 from "./pages/CG2023";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/submission" element={<SubmissionPage />} />
        <Route path="/infrastructureslow" element={<InfrastructureSlow />} />
        <Route path="/cs1231_1" element={<CS1231_1 />} />
        <Route path="/cs1231_2" element={<CS1231_2 />} />
        <Route path="/cg2023" element={<CG2023 />} />
      </Routes>
    </>
  );
}
