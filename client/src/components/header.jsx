import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";

const Header = ({ loggedIn, handleLogout, profileData }) => {
  const navigate = useNavigate();

  const username = profileData.username;

  // handle log out
  const handleLogoutThenNavigate = () => {
    handleLogout();
    navigate("/login");
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  };

  const handleNavigate = (url) => {
    navigate(url);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  };

  return (
    <div className="bg-black px-3 py-3 sm:px-10 flex justify-between items-center fixed w-full top-0 z-10">
      <button className="flex items-center" onClick={() => handleNavigate("/")}>
        <img src={logo} className="h-8" alt="logo"></img>
        <div className="hidden items-center sm:flex">
          <h3 className="text-white text-xl pl-2 bold">BLOCKCHAIN</h3>
          <h3 className="text-white text-3xl pl-3 pb-1 thin">/</h3>
          <h3 className="text-white text-md pl-3 pt-1"> FORUM</h3>
        </div>
      </button>
      {loggedIn ? (
        <div className="mx-1 sm:mr-3">
          <button onClick={() => handleNavigate("/")}>
            <p className="text-white px-2 py-1 regular text-xs sm:text-sm hover:underline duration-200">
              FORUM
            </p>
          </button>

          <button
            className="bg-white mx-2 px-2 py-1 sm:mx-3 sm:px-3 sm:py-3 rounded hover:bg-slate-300 duration-200"
            onClick={() => handleLogoutThenNavigate()}
          >
            <p className="regular text-xs sm:text-sm">LOG OUT</p>
          </button>
          <button onClick={() => handleNavigate("/")}>
            <p className="text-white px-2 py-1 regular text-xs sm:text-sm hover:underline duration-200">
              {username}
            </p>
          </button>
        </div>
      ) : (
        <div className="mx-1 sm:mr-3">
          <button onClick={() => handleNavigate("/")}>
            <p className="text-white px-2 py-1 regular text-xs sm:text-sm hover:underline duration-200">
              FORUM
            </p>
          </button>
          <button
            className="mx-1 sm:mx-3"
            onClick={() => handleNavigate("/sign-up")}
          >
            <p className="text-white px-2 py-1 regular text-xs sm:text-sm hover:underline duration-200">
              SIGN UP
            </p>
          </button>
          <button
            className="bg-white mx-2 px-2 py-1 sm:mx-3 sm:px-3 sm:py-3 rounded hover:bg-slate-300 duration-200"
            onClick={() => handleNavigate("/login")}
          >
            <p className="regular text-xs sm:text-sm">LOGIN</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
