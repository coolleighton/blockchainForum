import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Main from "./pages/main/Main.jsx";
import SignUp from "./pages/signup/Signup.jsx";
import Login from "./pages/login/Login.jsx";

function App() {
  const [backendData, setBackendData] = useState([{}]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("newPost");
  const [profileData, setProfileData] = useState("");

  const Url = "";
  // const Url = "https://blockchainforum.fly.dev";

  // google signup then sign in callback function
  async function handleCallbackResponse(response) {
    let userObject = jwtDecode(response.credential);
    let userData = {
      email: userObject.email,
      password: userObject.sub,
      username: userObject.name,
    };

    // sign up
    try {
      const response = await fetch(Url + "/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      let data = "";

      if (!response.ok) {
        data = await response.json();
      }

      // sign in
      if (response.ok || data.isUser) {
        userData = { email: userObject.email, password: userObject.sub };
        console.log(userData);
        try {
          const response = await fetch(Url + "/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          });

          if (response.ok) {
            const loginData = await response.json();
            const token = loginData.token;

            // Save token to local storage
            localStorage.setItem("token", token);
            window.location.replace("/");
          } else {
            console.error("Error logging in");
          }
        } catch (error) {
          console.error("Error logging in:", error.message);
        }
      } else {
        console.error("Error signing up");
      }
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "668090417329-r8v5g2khjctdq9o0ucp0levih650s62j.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
  }, []);

  // get forum posts
  useEffect(() => {
    fetch(Url + "/messages")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, [newPostTitle]);

  // Check if the user is logged in by sending a request to the backend
  useEffect(() => {
    const CheckAuth = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(Url + "/auth/checkAuth", {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setLoggedIn(true);
          setProfileData(data.authData.user.username);
        } else {
          console.error("Error checking auth");
        }
      } catch (error) {
        console.error("Error checking auth:", error.message);
      }
    };

    CheckAuth();
  }, []);

  // Send a request to the backend to logout the user
  const handleLogout = () => {
    console.log("clicked");
    localStorage.clear();
    setLoggedIn(false);
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
          profileData={profileData}
          Url={Url}
        />
      ),
    },
    {
      path: "/sign-up",
      element: <SignUp profileData={profileData} Url={Url} />,
    },
    {
      path: "/login",
      element: <Login profileData={profileData} Url={Url} />,
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
