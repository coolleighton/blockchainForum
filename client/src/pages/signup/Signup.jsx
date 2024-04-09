import Header from "../../components/header.jsx";
import Footer from "../../components/Footer.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ profileData, Url }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
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
      const response = await fetch(Url + "/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("signUp success");
        navigate("/login");
      } else {
        console.error("Error signing up");
      }
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  return (
    <div>
      <Header profileData={profileData}></Header>

      <div className="mt-16 h-[90vh] w-[100vw] flex items-center justify-center">
        <div className="mx-4 sm:mx-0">
          <h1 className="text-center bold text-2xl mb-8">
            Sign Up to the Blockchain Forum
          </h1>
          <form
            className="sm:w-[25rem]"
            action="/sign-up"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div className="flex-col">
              <label className="block text-xs pb-2" htmlFor="username">
                Username*
              </label>
              <input
                className="block mb-2 w-full px-1"
                name="username"
                placeholder="example123"
                type="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <hr></hr>
            <div className="flex-col">
              <label className="block text-xs pb-2 mt-4" htmlFor="email">
                E-mail*
              </label>
              <input
                className="block mb-2 w-full px-1"
                name="email"
                placeholder="example@email.com"
                type="email"
                value={formData.email}
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
              Sign Up
            </button>
          </form>
          <p className="sm:w-[20rem] text-center mx-auto mt-6 text-xs text-gray-500">
            Secure Sign up with PassportJS & bcrypt subject to Google{" "}
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

export default Signup;
