import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 style={{ color: "whitesmoke" }}>NUSnotes</h2>
      <div className="sidebar-button-container">
        <Link to="/">
          <button className="sidebar-button">Home</button>
        </Link>
        <p>List of Modules</p>
        <Link to="/CS1231">
          <button className="sidebar-button">CS1231</button>
        </Link>
        <Link to="/CG2023">
          <button className="sidebar-button">CG2023</button>
        </Link>
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
