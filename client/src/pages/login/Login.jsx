import Header from "../../components/header.jsx";
import Footer from "../../components/Footer.jsx";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ profileData, Url, loggedIn }) => {
  document.body.scrollTop = document.documentElement.scrollTop = 0;

  const navigate = useNavigate();
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  // handle login via google auth
  useEffect(() => {
    /* global google */
    google.accounts.id.renderButton(document.getElementById("googleSignIn"), {
      theme: "outline",
      size: "large",
      width: "400",
    });
  }, []);

  // handle form submit data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(Url + "/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const token = data.token;

        // Save token to local storage
        localStorage.setItem("token", token);
        navigate("/");
        window.location.reload();
      } else {
        const data = await response.json();
        console.error("Error logging in");
        console.error(data.error);
        setLoginErrorMessage(data.error);
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  return (
    <div>
      <Header profileData={profileData} loggedIn={loggedIn}></Header>

      <div className="mt-16 h-[90vh] w-[100vw] flex items-center justify-center">
        <div className="mx-4 sm:mx-0">
          <h1 className="text-center bold text-2xl mb-8">
            Log in to Blockchain Forum
          </h1>

          <form className=" sm:w-[25rem]" onSubmit={handleSubmit}>
            <div
              className="pb-4"
              style={{ display: loginErrorMessage ? "block" : "hidden" }}
            >
              <p className="text-red-600 text-sm">{loginErrorMessage}</p>
            </div>

            <div className="flex-col">
              <label className="block text-xs pb-2" htmlFor="email">
                E-mail*
              </label>
              <input
                className="block mb-2 w-full px-1"
                name="email"
                placeholder="example@123.com"
                type="email"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <hr></hr>
            <div className="flex-col ">
              <label className="block text-xs pb-2 mt-4" htmlFor="password">
                Password*
              </label>
              <input
                className="block mb-2 w-full px-1"
                name="password"
                placeholder="Password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <hr className="mb-8"></hr>

            <button className="w-full bg-black text-white py-2 rounded bold hover:bg-gray-700 duration-200">
              Login
            </button>

            <div className="flex justify-center w-full">
              <p className="my-4 text-xs">Or</p>
            </div>
            <div id="googleSignIn"></div>
          </form>
          <p className="sm:w-[20rem] text-center mx-auto mt-6 text-xs text-gray-500">
            Secure Login with PassportJS & bcrypt subject to Google{" "}
            <a
              href="https://policies.google.com/terms?hl=en"
              target="_blank"
              className="underline"
              rel="noreferrer"
            >
              Terms
            </a>{" "}
            &{" "}
            <a
              href="https://policies.google.com/privacy?hl=en"
              target="_blank"
              className="underline"
              rel="noreferrer"
            >
              Privacy
            </a>
          </p>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Login;
