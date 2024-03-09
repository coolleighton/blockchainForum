import Header from "../../components/header.jsx";

const Login = () => {
  return (
    <div>
      <Header></Header>

      <div className="mt-16 h-[85vh] w-[100vw] flex items-center justify-center">
        <div>
          <h1 className="text-center bold text-2xl mb-8">
            Log in to Blockchain Forum
          </h1>
          <form className="w-[25rem]" action="" method="POST">
            <div className="flex-col">
              <label className="block text-xs pb-2" for="email">
                Username*
              </label>
              <input
                className="block mb-2 w-full px-1"
                name="email"
                placeholder="example@email.com"
                type="email"
                required
              />
            </div>
            <hr></hr>
            <div className="flex-col ">
              <label className="block text-xs pb-2 mt-4" for="password">
                Password*
              </label>
              <input
                className="block mb-2 w-full px-1"
                name="password"
                placeholder="Password"
                type="password"
                required
              />
            </div>
            <hr className="mb-8"></hr>
            <button className="w-full bg-black text-white py-2 rounded bold hover:bg-gray-700 duration-200">
              Sign Up
            </button>
          </form>
          <p className="w-[20rem] text-center mx-auto mt-6 text-xs text-gray-500">
            Secure Login with PassportJS & bcrypt subject to Google{" "}
            <a
              href="https://policies.google.com/terms?hl=en"
              target="_blank"
              className="underline"
            >
              Terms
            </a>{" "}
            &{" "}
            <a
              href="https://policies.google.com/privacy?hl=en"
              target="_blank"
              className="underline"
            >
              Privacy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;