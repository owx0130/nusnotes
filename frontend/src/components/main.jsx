import React, {useCallback, useState } from "react";
import axios from "axios";
import {useDropzone} from 'react-dropzone';

export default function Main() {
  const INDIV_URL = "http://localhost:8000/pdfsummary";
  const URL = "http://localhost:4000/summary"
  const [prompt, setPrompt] = useState(null);
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [file, setfile] = useState("");

 

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    console.log(acceptedFiles);
    setfile(acceptedFiles[0].name);
    setPrompt(acceptedFiles[0]);
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  function handleSubmit(event) {
    event.preventDefault();
    console.log(prompt)
    const fd = new FormData();
    fd.append("prompt", prompt)
    fd.append("subject", name)
    fd.append("topic", topic)
    axios.post(INDIV_URL,fd).catch(function (error) {
      console.log('IDK WHY ERROR');
    })
    console.log("hi")
    const embedID = `${name}-${topic}`
    postMongo(name,topic,embedID)

    //reset options
    setName("");
    setTopic("");
    setfile("");
  }
function postMongo(subject,topic,embedID){
  axios.post(URL,{subject,topic,embedID})
  .then((resp) =>{
    console.log(resp)
  }).catch(function (error) {
    console.log('IDK WHY ERROR');
  })
}

  return (
    <div className="main">
      <h1>Your Personal Notes</h1>
      <form className="form-style">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Subject"
      />
      <input
      value={topic}
      onChange={(e)=> setTopic(e.target.value)}
      placeholder="Topic"/>
        {/* <input
          onChange={(e) => setPrompt(e.target.files[0])}
          type="file"
          accept=".pdf"
        /> */}
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
              isDragActive ?
              <p>Drop the files here ...</p> :
              <p>Drag 'n' drop some files here, or click to select files</p>
            }
            <div>{file}</div>
          </div>
        <button onClick={(e) => handleSubmit(e)}>Submit</button>
      </form>
    </div>
  );
}


