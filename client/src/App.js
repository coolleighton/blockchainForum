import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Main from "./pages/main/Main.jsx";
import SignUp from "./pages/signup/Signup.jsx";
import Login from "./pages/login/Login.jsx";

function App() {
  const [backendData, setBackendData] = useState([{}]);
  const [loggedIn, setLoggedIn] = useState();
  const [newPostTitle, setNewPostTitle] = useState("newPost");

  useEffect(() => {
    // Check if the user is logged in by sending a request to the backend
    fetch("/checkAuth", {
      method: "GET",
      credentials: "include", // Include credentials (cookies) in the request
    })
      .then((response) => {
        if (response.ok) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      })
      .catch((error) => {
        console.error("Error checking authentication:", error);
        setLoggedIn(false);
      });
  }, []);

  useEffect(() => {
    fetch("/messages")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);

        console.log(data);
      });
  }, [newPostTitle]);

  const handleLogout = () => {
    console.log("clicked");
    // Send a request to the backend to logout the user
    fetch("/logout", {
      method: "POST",
      credentials: "include", // Include credentials (cookies) in the request
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          setLoggedIn(false); // Update loggedIn state
        } else {
          console.error("Failed to logout");
        }
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Main
          backendData={backendData}
          loggedIn={loggedIn}
          handleLogout={handleLogout}
          setNewPostTitle={setNewPostTitle}
        />
      ),
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
