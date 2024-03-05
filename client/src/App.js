import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("/api/messages")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
        console.log(data);
      });
  }, []);

  return (
    <div>
      {typeof backendData === "undefined" ? (
        <p>Loading...</p>
      ) : (
        backendData.map((data, i) => (
          <div key={i}>
            <h1>{data.author}</h1>
            <p>{data.text}</p>
            <p>{data.posted}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
