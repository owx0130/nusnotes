import axios from 'axios'
import { useModuleContext } from "../context/useModuleContext";

export default function Content() {
  
  const {modules, dispatch} = useModuleContext()

  return (
    <div className="main">
      <div className="top-section-container">
        <h2>CS1231 Summary</h2>
        <button className="btn btn-dark">Test Yourself!</button>
      </div>
      <div>
        <p>
          <button
            class="btn btn-primary"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#cs1231_1"
            aria-expanded="false"
            aria-controls="cs1231_1"
          >
            Chapter 1
          </button>
        </p>
        <div class="collapse" id="cs1231_1">
          <div class="card card-body">
            Some placeholder content for the collapse component. This panel is
            hidden by default but revealed when the user activates the relevant
            trigger.
          </div>
        </div>
        <p>
          <button
            class="btn btn-primary"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#cs1231_2"
            aria-expanded="false"
            aria-controls="cs1231_2"
          >
            Chapter 2
          </button>
        </p>
        <div class="collapse" id="cs1231_2">
          <div class="card card-body">
            Some placeholder content for the collapse component. This panel is
            hidden by default but revealed when the user activates the relevant
            trigger.
          </div>
        </div>
        <p>
          <button
            class="btn btn-primary"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#cs1231_3"
            aria-expanded="false"
            aria-controls="cs1231_3"
          >
            Chapter 3
          </button>
        </p>
        <div class="collapse" id="cs1231_3">
          <div class="card card-body">
            Some placeholder content for the collapse component. This panel is
            hidden by default but revealed when the user activates the relevant
            trigger.
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
