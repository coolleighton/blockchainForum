import { useNavigate } from "react-router-dom";

const LoginMessage = ({ loginMessage, setLoginMessageActive }) => {
  const navigate = useNavigate();

  const handleNavClick = (link) => {
    setLoginMessageActive(false);
    navigate(link);
  };

  return (
    <div className="fixed inset-0 w-screen h-screen backdrop-blur-sm flex justify-center bg-black bg-opacity-20 z-20">
      <div className="fixed bg-white  p-8 rounded w-3/12 mx-auto mt-[40vh]">
        <div className="flex-col h-full">
          <h3 className="bold text-3xl mb-2">Please Login</h3>
          <p className="text-xl mb-8">
            In order to {loginMessage}, sign up or login.
          </p>
          <div className="flex justify-between bottom-px">
            <button
              className="bg-black px-3 py-1 rounded hover:bg-gray-600 duration-200 text-white"
              onClick={() => setLoginMessageActive(false)}
            >
              Cancel
            </button>
            <div>
              <button
                className="bg-black px-3 py-1 rounded hover:bg-gray-600 duration-200 mr-4 text-white"
                onClick={() => handleNavClick("/sign-up")}
              >
                Sign Up
              </button>
              <button
                className="bg-black px-3 py-1 rounded hover:bg-gray-600 duration-200 text-white"
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
