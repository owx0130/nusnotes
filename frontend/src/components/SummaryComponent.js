import axios from "axios";
import { useEffect, useState } from "react";
export default function SummaryComponent({onSelectTopic}, module, topic) {
  const [sumText, setSumText] = useState("");
  const [qnText, setQnText] = useState("");
  const URL = "http://localhost:8000/pdfsummary";

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
        onSelectModule({module:code, topics:uniqueTopics})
    
      })
      .finally(() => {
        setLoading(false);
      });
}

  return (
    <>
      
    </>
  );
}
