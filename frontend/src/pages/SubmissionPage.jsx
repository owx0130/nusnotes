import Submission from "../components/submission";
import { Link } from "react-router-dom";
import Modules from "../components/Modules";
import { useState } from "react";
import axios from "axios";
import logo from "./image.png";
import WelcomeMessage from "../components/welcome";

export default function SubmissionPage() {
  const [showModule, setShowModule] = useState(true);
  const [selectedModule, setSelectedModule] = useState({
    module: "",
    topics: [],
  });
  const [selectedTopic, setSelectedTopics] = useState({
    module: "",
    topic: "",
    sumText: "",
    qnText: "",
  });
  const [sumText, setSumText] = useState("");
  const [qnText, setQnText] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [showSum, setShowSum] = useState(true);
  function handleSelectModule(moduleInfo) {
    setSelectedModule(moduleInfo);
    setShowModule(false);
    setShowForm(false);
  }
  const URL = "http://localhost:8000/pdfsummary";
  const handleTopicClick = (module, topic) => {
    axios.get(`${URL}/${module}/${topic}`).then((res) => {
      setSumText(res.data[0].sumText);
      setQnText(res.data[0].questionText)
    });
  };

  const handleDelete = (module, topic) => {
    axios.delete(`${URL}/${module}/${topic}`).then(() => alert("Deleted!"));
    setShowModule(false);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <Link to="/">
      <img 
      className="img-thumbnail"
      style={{ backgroundColor: "transparent", border: "none", cursor: "pointer" }}
      src={logo} alt="Logo" />
      </Link>
        <div className="sidebar-button-container">
          <Link to="/">
            <button className="sidebar-button">Home</button>
          </Link>
          <p>List of Modules</p>
          <Modules onSelectedModule={handleSelectModule} />
        </div>
        <div className="sidebar-button-container">
          <p>Make a notes submission here:</p>
          <Link to="/submission">
            <button
              className="sidebar-button"
              onClick={() => setShowForm(true)}
            >
              Submit Notes
            </button>
          </Link>
        </div>
      </div>
      {showForm ? (
        <Submission />
      ) : (
        <div className="main">
          <>
            {showModule ? (
              <WelcomeMessage/>
            ) : (
              <>
                <div className="top-section-container">
                {showSum ? (
                <>
                  <h2>{selectedModule.module} Summary</h2>
                  <button
                    onClick={() => setShowSum(false)}
                    className="btn btn-dark"
                  >
                    Test Yourself!
                  </button>
                </>
              ) : (
                <>
                  <h2>{selectedModule.module} Quiz</h2>
                  <button
                    onClick={() => setShowSum(true)}
                    className="btn btn-dark"
                  >
                    Review Notes!
                  </button>
                </>
              )}
                </div>
                <div>
                  {selectedModule.topics.map((topic, id) => (
                    <>
                      <p>
                        <button
                          class="btn btn-primary"
                          type="button"
                          key={topic}
                          data-bs-toggle="collapse"
                          data-bs-target={`#cs1231_${id}`}
                          aria-expanded="false"
                          aria-controls={`cs1231_${id}`}
                          onClick={() =>
                            handleTopicClick(selectedModule.module, topic)
                          }
                        >
                          {topic}
                        </button>
                      </p>

                      <div class="collapse" id={`cs1231_${id}`}>
                        <div
                          class="card card-body"
                          style={{ backgroundColor: "#ecf0f1" }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-trash"
                            viewBox="0 0 16 16"
                            onClick={() =>
                              handleDelete(selectedModule.module, topic)
                            }
                          >
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                          </svg>
                          <>
                        {showSum ? (
                          <pre class="sumtext">{sumText}</pre>
                        ) : (
                          <pre class="sumtext">{qnText}</pre>
                        )}
                      </>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </>
            )}
          </>
        </div>
      )}
    </div>
  );
}
