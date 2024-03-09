import "./main.css";
import logo from "../images/logo.png";
import heroImage from "../images/heroImage.png";
import messageIcon from "../images/messageIcon.png";
import arrowRight from "../images/arrowRight.png";
import upArrow from "../images/upArrow.png";
import downArrow from "../images/downArrow.png";

const Main = ({ backendData }) => {
  return (
    <div className="flex-col bg-black">
      <div className="bg-black py-3 pl-10 pr-5 flex justify-between items-center fixed w-full top-0">
        <button
          className="flex items-center"
          onClick={() => window.location.reload()}
        >
          <img src={logo} className="h-8" alt="logo"></img>
          <h3 className="text-white text-xl pl-2 bold">BLOCKCHAIN</h3>
          <h3 className="text-white text-3xl pl-3 pb-1 thin">/</h3>
          <h3 className="text-white text-md pl-3 pt-1"> FORUM</h3>
        </button>
        <div className="mr-4">
          <button className="mx-3">
            <p className="text-white px-2 py-1 regular text-sm hover:underline duration-200">
              SIGN UP
            </p>
          </button>
          <button className="bg-white mx-3 px-3 py-3 rounded hover:bg-slate-300 duration-200">
            <p className="regular text-sm">LOGIN</p>
          </button>
        </div>
      </div>

      <div className="h-[50vh] w-[70vw] mx-auto flex items-center justify-between">
        <div className="w-[30rem]">
          <h1 className="text-white text-7xl bold">Find Solutions</h1>
          <h2 className="mt-2 text-3xl text-slate-300">
            The #1 Cryptocurreny Forum on the Blockchain
          </h2>
        </div>

        <img className="h-full pt-16" src={heroImage}></img>
      </div>
      <div className="bg-white pt-12">
        <div className="w-[70vw] mx-auto flex justify-between">
          <div className="w-[70%]">
            <div className="flex justify-between">
              <h3 className="text-3xl bold pb-2">Browse Forum Messages</h3>
              <button className="bg-black px-4 rounded hover:bg-gray-700 duration-200">
                <p className="text-white regular">ASK A QUESTION</p>
              </button>
            </div>

            {typeof backendData === "undefined" ? (
              <p>Loading...</p>
            ) : (
              backendData.map((data, i) => (
                <div
                  key={i}
                  className="flex justify-between items-end border-[1px] mt-6 p-4 rounded hover:bg-gray-100 duration-200 cursor-pointer"
                >
                  <div>
                    <img src={messageIcon} className="h-6 mb-2"></img>
                    <p className="text-xl bold">This will be the title?</p>
                    <p className="text-lg">{data.text}</p>
                    <div className="flex pt-2">
                      <p className="text-sm mr-2 text-gray-400">
                        By {data.author},
                      </p>
                      <p className="text-sm text-gray-400"> {data.posted}</p>
                    </div>
                  </div>
                  <div className="flex w-[15rem] justify-end">
                    <p className="mr-4 regular">5 replies</p>

                    <button className="flex mr-2 items-center hover:contrast-150 duration-200">
                      <img className="h-4" src={upArrow}></img>
                      <p className="upArrow">6</p>
                    </button>

                    <button className="flex items-center hover:contrast-150 duration-200">
                      <img className="h-4" src={downArrow}></img>
                      <p className="downArrow">6</p>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="bg-gray-200 h-fit w-[25%] py-6 flex flex-col justify-center items-center rounded">
            <div>
              <h2 className="text-2xl bold pb-2">News</h2>
              <a
                href="https://pros.squarespace.com/blog/2024-web-design-trends"
                target="_blank"
              >
                <button className="flex items-center hover:brightness-0 duration-200 pt-2">
                  <p className="regular text-gray-600">
                    Whats new at the blochain in 2024
                  </p>
                  <img src={arrowRight} className="h-6 pl-1"></img>
                </button>
              </a>
              <a
                href="https://pros.squarespace.com/blog/2024-web-design-trends"
                target="_blank"
              >
                <button className="flex items-center hover:brightness-0 duration-200 pt-2">
                  <p className="regular text-gray-600">
                    Whats new at the blochain in 2024
                  </p>
                  <img src={arrowRight} className="h-6 pl-1"></img>
                </button>
              </a>
              <a
                href="https://pros.squarespace.com/blog/2024-web-design-trends"
                target="_blank"
              >
                <button className="flex items-center hover:brightness-0 duration-200 pt-2">
                  <p className="regular text-gray-600">
                    Whats new at the blochain in 2024
                  </p>
                  <img src={arrowRight} className="h-6 pl-1"></img>
                </button>
              </a>
              <a
                href="https://pros.squarespace.com/blog/2024-web-design-trends"
                target="_blank"
              >
                <button className="flex items-center hover:brightness-0 duration-200 pt-2">
                  <p className="regular text-gray-600">
                    Whats new at the blochain in 2024
                  </p>
                  <img src={arrowRight} className="h-6 pl-1"></img>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
