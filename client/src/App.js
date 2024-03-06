import "./App.css";
import React, { useEffect, useState } from "react";
import Main from "./components/Main";

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
      {backendData ? (
        <Main backendData={backendData}></Main>
      ) : (
        <div>
          <h1>Loading...</h1>
        </div>
      )}
    </div>
  );
}

export default App;
