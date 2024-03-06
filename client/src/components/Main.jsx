import logo from "../images/logo.png";
import heroImage from "../images/heroImage.png";

const Main = ({ backendData }) => {
  return (
    <div className="flex-col bg-black">
      <div className="bg-black py-3 pl-10 pr-5 flex justify-between items-center fixed w-full top-0">
        <button
          className="flex items-center"
          onClick={() => window.location.reload()}
        >
          <img src={logo} className="h-8" alt="logo"></img>
          <h3 className="text-white text-xl pl-2 font-semibold">BLOCKCHAIN</h3>
          <h3 className="text-white text-3xl pl-3 pb-1 font-thin">/</h3>
          <h3 className="text-slate-300 text-md pl-3 pt-1"> FORUM</h3>
        </button>
        <div className="mr-4">
          <button className="mx-3">
            <p className="text-white px-2 py-1 font-semibold text-sm hover:underline duration-300">
              SIGN UP
            </p>
          </button>
          <button className="bg-white mx-3 px-3 py-3 rounded hover:bg-slate-300 duration-300">
            <p className="font-semibold text-sm">LOGIN</p>
          </button>
        </div>
      </div>

      <div className="h-[50vh] w-[70vw] mx-auto flex items-center justify-between">
        <div className="w-[30rem]">
          <h1 className="text-white text-7xl font-semibold">Find Solutions</h1>
          <h2 className="mt-2 text-3xl text-slate-300">
            The #1 Cryptocurreny Forum on the Blockchain
          </h2>
        </div>

        <img className="h-full pt-16" src={heroImage}></img>
      </div>

      <div className="bg-white">
        <div className="w-[70vw] mx-auto">
          {typeof backendData === "undefined" ? (
            <p>Loading...</p>
          ) : (
            backendData.map((data, i) => (
              <div key={i}>
                <h1 className="text-4xl">{data.author}</h1>
                <p>{data.text}</p>
                <p>{data.posted}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
