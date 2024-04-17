import { useNavigate } from "react-router-dom";

const LoginMessage = ({ loginMessage, setLoginMessageActive }) => {
  const navigate = useNavigate();

  const handleNavClick = (link) => {
    setLoginMessageActive(false);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    navigate(link);
  };

  return (
    <div className="fixed inset-0 w-screen h-screen backdrop-blur-sm flex justify-center bg-black bg-opacity-20 z-20">
      <div className="fixed bg-white p-4 sm:p-8 rounded w-5/6 sm:w-1/2 xl:w-3/12 mx-auto mt-[20vh] sm:mt-[40vh] ">
        <div className="flex-col h-full">
          <h3 className="bold text-2xl sm:text-3xl mb-2">Please Login</h3>
          <p className="text-lg sm:text-xl mb-8">
            In order to {loginMessage}, sign up or login.
          </p>
          <div className="flex flex-col-reverse sm:flex-row justify-between bottom-px">
            <button
              className="bg-black px-3 py-1 rounded hover:bg-gray-600 duration-200 text-white text-sm sm:text-base"
              onClick={() => setLoginMessageActive(false)}
            >
              Cancel
            </button>
            <div className="flex flex-col sm:flex-row">
              <button
                className="bg-black px-3 py-1 rounded hover:bg-gray-600 duration-200 sm:mr-4 text-white text-sm sm:text-base mb-2 sm:mb-0"
                onClick={() => handleNavClick("/sign-up")}
              >
                Sign Up
              </button>
              <button
                className="bg-black px-3 py-1 rounded hover:bg-gray-600 duration-200 text-white text-sm sm:text-base mb-6 sm:mb-0"
                onClick={() => handleNavClick("/login")}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginMessage;
