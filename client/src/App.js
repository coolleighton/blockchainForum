import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Main from "./pages/main/Main.jsx";
import SignUp from "./pages/signup/Signup.jsx";
import Login from "./pages/login/Login.jsx";

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

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main backendData={backendData} />,
    },
    {
      path: "sign-up",
      element: <SignUp />,
    },
    {
      path: "login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
