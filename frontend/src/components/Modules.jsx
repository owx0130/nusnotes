import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Modules() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const URL = "http://localhost:8000/pdfsummary";
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

  return (
    <>
      {loading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : modules.length > 0 ? (
        modules.map((module) => (
          <button className="sidebar-button">{module}</button>
        ))
      ) : (
        <p>No Modules</p>
      )}
    </>
  );
}
