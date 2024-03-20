import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Main from "./pages/main/Main.jsx";
import SignUp from "./pages/signup/Signup.jsx";
import Login from "./pages/login/Login.jsx";

function App() {
  const [backendData, setBackendData] = useState([{}]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("newPost");
  const [profileData, setProfileData] = useState({});

  //const Url = "";
  const Url = "https://blockchainforum.fly.dev";

  // Get user profile data if available
  useEffect(() => {
    fetch(Url + "/profile")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log("logged in");
        setProfileData(data.username);
      });
  }, [loggedIn]);

  useEffect(() => {
    // Check if the user is logged in by sending a request to the backend
    fetch(Url + "/checkAuth", {
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

  // get forum posts
  useEffect(() => {
    fetch(Url + "/messages")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
        console.log(data);
      });
  }, [newPostTitle]);

  const handleLogout = () => {
    console.log("clicked");
    // Send a request to the backend to logout the user
    fetch(Url + "/logout", {
      method: "POST",
      credentials: "include", // Include credentials (cookies) in the request
    })
      .then((response) => {
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
          newPostTitle={newPostTitle}
          profileData={profileData}
          Url={Url}
        />
      ),
    },
    {
      path: "sign-up",
      element: <SignUp profileData={profileData} Url={Url} />,
    },
    {
      path: "login",
      element: <Login profileData={profileData} Url={Url} />,
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
