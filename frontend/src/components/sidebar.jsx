import { Link } from "react-router-dom";
import Modules from "./modules";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 style={{ color: "whitesmoke" }}>NUSnotes</h2>
      <div className="sidebar-button-container">
        <button className="sidebar-button">Home</button>
        <p>List of Modules</p>
        <Modules />
      </div>
      <div className="sidebar-button-container">
        <p>Make a notes submission here:</p>
        <Link to="/submission">
          <button className="sidebar-button">Submit Notes</button>
        </Link>
      </div>
    </div>
  );
}
