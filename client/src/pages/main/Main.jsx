import "./main.css";
import heroImage from "../../images/heroImage.png";
import messageIcon from "../../images/messageIcon.png";
import arrowRight from "../../images/arrowRight.png";
import upArrow from "../../images/upArrow.png";
import downArrow from "../../images/downArrow.png";

import Header from "../../components/header.jsx";

const Main = ({ backendData }) => {
  return (
    <div className="flex-col bg-black">
      <Header></Header>

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
              backendData.map((data, i) => {
                let commentsLength = 0;
                if (data.comments) {
                  commentsLength = data.comments.length;
                }

                return (
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
                      <button className="hover:text-gray-400 duration-200">
                        <p className="mr-4 regular">{commentsLength} replies</p>
                      </button>

                      <button className="flex mr-2 items-center hover:contrast-150 duration-200">
                        <img className="h-4" src={upArrow}></img>
                        <p className="upArrow">{data.upVotes}</p>
                      </button>

                      <button className="flex items-center hover:contrast-150 duration-200">
                        <img className="h-4" src={downArrow}></img>
                        <p className="downArrow">{data.downVotes}</p>
                      </button>
                    </div>
                  </div>
                );
              })
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
