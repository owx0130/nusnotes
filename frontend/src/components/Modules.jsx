import axios from "axios";
import { useEffect, useState } from "react";

export default function Modules({onSelectedModule}) {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [topics, setTopics] = useState([])
  
  const URL = "http://localhost:8000/pdfsummary";
  useEffect(() => {
    setLoading(true);
    axios
      .get(URL)
      .then((res) => {
        const uniqueModules = Array.from(
          new Set(res.data.map((module) => module.module))
        );
        setModules(uniqueModules);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  console.log(typeof onSelectedModule)

const handleClick = (code) =>{
    const modURL = `${URL}/${code}`
    axios
      .get(modURL)
      .then((res) => {
        console.log(res)
        const uniqueTopics = Array.from(
          new Set(res.data.map((topic) => topic.topic))
        );
        setTopics(uniqueTopics);
        onSelectedModule({module:code, topics:uniqueTopics});
    
      })
      .finally(() => {
        setLoading(false);
      });
}

  return (
    <>
      {loading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : modules.length > 0 ? (
        modules.map((module) => (
          <button key={module} onClick={()=>handleClick(module)} className="sidebar-button">{module}</button>
        ))
      ) : (
        <p>No Modules</p>
      )}
    </>
  );
}
