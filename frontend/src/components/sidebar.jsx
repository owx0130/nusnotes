import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 style={{ color: "whitesmoke", marginTop: "21.44px" }}>NUSnotes</h2>
      <div className="sidebar-button-container">
        <Link to="/">
          <button className="sidebar-button">Home</button>
        </Link>
        <p>List of Modules</p>
        <div class="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            CS1231
          </button>
          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item" href="/cs1231_1">
                Chapter 1
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="/cs1231_2">
                Chapter 2
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Chapter 3
              </a>
            </li>
          </ul>
        </div>
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
