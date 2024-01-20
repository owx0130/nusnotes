import { Link } from "react-router-dom";
import Modules from "../components/Modules";
import { useState } from "react";
import axios from "axios";

export default function Home() {
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

  function handleSelectModule(moduleInfo){
    setSelectedModule(moduleInfo);
    setShowModule(false);
  };
  const URL = "http://localhost:8000/pdfsummary";
  const handleTopicClick = (module, topic) => {
    axios.get(`${URL}/${module}/${topic}`).then((res) => {
      setSumText(res.data[0].sumText);
    });
  };

  return (
    <div className="app">
      <div className="sidebar">
        <h2 style={{ color: "whitesmoke" }}>NUSnotes</h2>
        <div className="sidebar-button-container">
          <button className="sidebar-button">Home</button>
          <p>List of Modules</p>
          <Modules onSelectedModule={handleSelectModule} />
        </div>
        <div className="sidebar-button-container">
          <p>Make a notes submission here:</p>
          <Link to="/submission">
            <button className="sidebar-button">Submit Notes</button>
          </Link>
        </div>
      </div>

      <div className="main">
        <>
          {showModule ? (
            <>
              <div className="top-section-container">
                <h2>Welcome to NUSnotes!</h2>
              </div>
              <div>To do: Write introduction here</div>
            </>
          ) : (
            <div>
              <div className="top-section-container">
                <h2>{selectedModule.module} Summary</h2>
                <button className="btn btn-dark">Test Yourself!</button>
              </div>
              <div>
                {selectedModule.topics.map((topic) => (
                  <>
                  <p>
                    <button
                      class="btn btn-primary"
                      type="button"
                      key={topic}
                      data-bs-toggle="collapse"
                      data-bs-target="#cs1231_1"
                      aria-expanded="false"
                      aria-controls="cs1231_1"
                      onClick={() =>
                        handleTopicClick(selectedModule.module, topic)
                      }
                    >
                      {topic}
                    </button>
                  </p>
                
                <div class="collapse" id="cs1231_1">
                  <div class="card card-body">
                    <pre>{sumText}</pre>
                  </div>
                </div>
                </>
                ))}
              </div>
            </div>
          )}
        </>
      </div>
    </div>
  );
}
