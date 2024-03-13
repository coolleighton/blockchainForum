import "./main.css";
import heroImage from "../../images/heroImage.png";
import arrowRight from "../../images/arrowRight.png";

import Header from "../../components/header.jsx";
import Post from "../../components/Post.jsx";
import PostForm from "../../components/PostForm.jsx";
import { useState } from "react";

const Main = ({ backendData, loggedIn, handleLogout }) => {
  const [postFormActive, setPostFormActive] = useState(false);

  const handleTogglePostForm = () => {
    if (postFormActive === false) {
      setPostFormActive(true);
    } else {
      setPostFormActive(false);
    }
  };

  const handleOpenPostForm = () => {
    setPostFormActive(true);
  };

  return (
    <div className="flex-col bg-black">
      <Header loggedIn={loggedIn} handleLogout={handleLogout}></Header>

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
              <button
                className="bg-black px-4 rounded hover:bg-gray-700 duration-200 text-white regular"
                onClick={() => handleOpenPostForm()}
              >
                ASK A QUESTION
              </button>
            </div>

            <div>
              {postFormActive ? (
                <PostForm
                  handleTogglePostForm={handleTogglePostForm}
                ></PostForm>
              ) : (
                <></>
              )}
            </div>

            {typeof backendData === "undefined" ? (
              <p>Loading...</p>
            ) : (
              backendData.map((data) => {
                return <Post data={data}></Post>;
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
