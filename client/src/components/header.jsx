import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import logo from "../images/logo.png";

const Header = ({ loggedIn, handleLogout, profileData }) => {
  const navigate = useNavigate();

  const username = profileData.toString();

  const handleLogoutThenNavigate = () => {
    handleLogout();
    navigate("/login");
  };

  return (
    <div className="bg-black py-3 pl-10 pr-5 flex justify-between items-center fixed w-full top-0 z-10">
      <button className="flex items-center" onClick={() => navigate("/")}>
        <img src={logo} className="h-8" alt="logo"></img>
        <h3 className="text-white text-xl pl-2 bold">BLOCKCHAIN</h3>
        <h3 className="text-white text-3xl pl-3 pb-1 thin">/</h3>
        <h3 className="text-white text-md pl-3 pt-1"> FORUM</h3>
      </button>
      {loggedIn ? (
        <div className="mr-4">
          <button onClick={() => navigate("/")}>
            <p className="text-white px-2 py-1 regular text-sm hover:underline duration-200">
              FORUM
            </p>
          </button>

          <button
            className="bg-white mx-3 px-3 py-3 rounded hover:bg-slate-300 duration-200"
            onClick={() => handleLogoutThenNavigate()}
          >
            <p className="regular text-sm">LOG OUT</p>
          </button>
          <button onClick={() => navigate("/")}>
            <p className="text-white px-2 py-1 regular text-sm hover:underline duration-200">
              {username}
            </p>
          </button>
        </div>
      ) : (
        <div className="mr-4">
          <button onClick={() => navigate("/")}>
            <p className="text-white px-2 py-1 regular text-sm hover:underline duration-200">
              FORUM
            </p>
          </button>
          <button className="mx-3" onClick={() => navigate("/sign-up")}>
            <p className="text-white px-2 py-1 regular text-sm hover:underline duration-200">
              SIGN UP
            </p>
          </button>
          <button
            className="bg-white mx-3 px-3 py-3 rounded hover:bg-slate-300 duration-200"
            onClick={() => navigate("/login")}
          >
            <p className="regular text-sm">LOGIN</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
