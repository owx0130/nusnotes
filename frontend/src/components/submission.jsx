import React, { useState } from "react";
import axios from "axios";

export default function Submission() {
  const INDIV_URL = "http://localhost:8000/pdfsummary";
  const [prompt, setPrompt] = useState(null);
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [module, setModule] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [sumText, setSumText] = useState("");
  const [loading, setLoading] = useState(true);
  const [message,setMessage] = useState("")
  function handleSubmit(event) {
    event.preventDefault();
    if(!showForm){
      setMessage("Let's try again! :)")
      axios.delete(`INDIV_URL/${module}/${topic}`)
      setSumText("")
      setLoading(true)
    }
    console.log(prompt);
    const fd = new FormData();
    fd.append("prompt", prompt);
    fd.append("module", module);
    fd.append("subject", name);
    fd.append("topic", topic);
    setShowForm(false);
    axios
      .post(INDIV_URL, fd)
      .catch(function (error) {
        console.log("Submit error");
      })
      .then((res) => {
        console.log(res)
        setSumText(res.data.sumText);
        setMessage("")
      })
      .finally(() => setLoading(false));
  }

  const handleApprove= (e)=> {
    e.preventDefault()
    alert("Nice")
    setShowForm(true);
    setMessage("")
    setModule("")
    setName("")
    setPrompt(null)
    setTopic("")
  }

  return (
    <div className="main">
      {showForm ? (
        <>
          <h1>Submit New Notes!</h1>
          <form className="form-style">
            <input
              value={module}
              onChange={(e) => setModule(e.target.value.toUpperCase())}
              placeholder="Module Code"
            />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Subject"
            />
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Topic"
            />

            <input onChange={(e) => setPrompt(e.target.files[0])} type="file" />
            <button onClick={(e) => handleSubmit(e)}>Submit</button>
          </form>
        </>
      ) : (
        <>
          <h1>Preview of Summary</h1>
          {loading ? (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <>
            <pre className="summarydisplay">{sumText}</pre>
            <button type="button" class="btn btn-outline-danger" onClick={(e)=>handleSubmit(e)}>Decline</button>
            <button type="button" class="btn btn-outline-success" onClick={(e)=> handleApprove(e)}>Approve</button>
            </>
          )}
          {
            message &&
            (
              <h2>{message}</h2>
            )
          }
        </>
      )}
    </div>
  );
}
