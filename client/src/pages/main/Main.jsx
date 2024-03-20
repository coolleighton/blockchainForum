import "./main.css";
import heroImage from "../../images/heroImage.png";
import arrowRight from "../../images/arrowRight.png";

import Header from "../../components/header.jsx";
import Post from "../../components/post/PostComponent/Post.jsx";
import PostForm from "../../components/PostForm.jsx";
import LoginMessage from "../../components/LoginMessage.jsx";
import { useState } from "react";

const Main = ({
  backendData,
  loggedIn,
  handleLogout,
  setNewPostTitle,
  profileData,
  Url,
}) => {
  const [postFormActive, setPostFormActive] = useState(false);
  const [sortedBy, setSortedBy] = useState("datePosted");
  const [loginMessage, setLoginMessage] = useState("up vote a post");
  const [LoginMessageActive, setLoginMessageActive] = useState(false);

  // sort data by either date or upvotes

  let sortedData = [{}];

  if (backendData) {
    if (sortedBy === "upVotes") {
      sortedData = backendData.sort((a, b) => b.upVotes - a.upVotes);
    } else if (sortedBy === "datePosted") {
      sortedData = backendData.sort(
        (b, a) => new Date(a.posted) - new Date(b.posted)
      );
    }
  }

  // handle either open form or toggle open form

  const handleTogglePostForm = () => {
    if (postFormActive === false) {
      setPostFormActive(true);
    } else {
      setPostFormActive(false);
    }
  };

  const handleOpenPostForm = () => {
    if (loggedIn) {
      setPostFormActive(true);
    } else {
      setLoginMessage("ask a question");
      setLoginMessageActive(true);
    }
  };

  // handle when sort buttons are clicked

  const handleSortByDate = () => {
    setSortedBy("datePosted");
  };

  const handleSortByUpVotes = () => {
    setSortedBy("upVotes");
  };

  // handle hover effects for buttons that are controlled by inline styles.  can't be done via class names when inline styles are used

  return (
    <div className="flex-col bg-black relative">
      <Header
        loggedIn={loggedIn}
        handleLogout={handleLogout}
        profileData={profileData}
      ></Header>

      <div className="h-[50vh] w-[70vw] mx-auto flex items-center justify-between">
        <div className="w-[30rem]">
          <h1 className="text-white text-7xl bold">Find Solutions</h1>
          <h2 className="mt-2 text-3xl text-slate-300">
            The #1 Cryptocurrency Forum on the Blockchain
          </h2>
        </div>

        <img className="h-full pt-16" src={heroImage}></img>
      </div>
      <div className="bg-white pt-12">
        <div className="w-[70vw] mx-auto flex justify-between">
          <div className="w-[70%]">
            <div className="flex justify-between mb-8">
              <h3 className="text-3xl bold pb-2">Browse Forum Messages</h3>

              <button
                className=" bg-black px-4 rounded hover:bg-gray-600 duration-200 text-white regular"
                onClick={() => handleOpenPostForm()}
              >
                ASK A QUESTION
              </button>
            </div>
            <div className="flex place-items-center">
              <p className="bold mr-4">Sort By:</p>
              <button
                className=" px-3 py-1 rounded  duration-200 mr-4"
                onClick={() => handleSortByDate()}
                style={{
                  backgroundColor: sortedBy === "upVotes" ? "black" : "#4B5563",
                }}
              >
                <p className="text-sm text-white regular">Most Recent</p>
              </button>
              <button
                className=" px-3 py-1 rounded duration-200 mr-4"
                onClick={() => handleSortByUpVotes()}
                style={{
                  backgroundColor: sortedBy === "upVotes" ? "#4B5563" : "black",
                }}
              >
                <p className="text-sm text-white regular">Most Popular</p>
              </button>
            </div>
            <div>
              {postFormActive ? (
                <PostForm
                  handleTogglePostForm={handleTogglePostForm}
                  setNewPostTitle={setNewPostTitle}
                  handleSortByDate={handleSortByDate}
                  Url={Url}
                ></PostForm>
              ) : (
                <></>
              )}
            </div>

            {typeof backendData === "undefined" ? (
              <p>Loading...</p>
            ) : (
              backendData.map((sortedData) => {
                return (
                  <Post
                    data={sortedData}
                    setNewPostTitle={setNewPostTitle}
                    loggedIn={loggedIn}
                    setLoginMessage={setLoginMessage}
                    setLoginMessageActive={setLoginMessageActive}
                    Url={Url}
                  ></Post>
                );
              })
            )}
          </div>
          <div className="bg-gray-200 h-fit w-[25%] p-6 flex flex-col justify-center items-center rounded">
            <div>
              <h2 className="text-2xl bold pb-2">News</h2>
              <a
                rel="noreferrer"
                href="https://www.benjamindada.com/zone-raises-seed-blockchain-fintech-nigerian/"
                target="_blank"
              >
                <button className="flex items-center hover:brightness-0 duration-200 pt-2">
                  <p className="regular text-gray-600 text-sm text-left">
                    Nigerian blockchain fintech startup Zone raises $8.5M Seed
                  </p>
                  <img src={arrowRight} className="h-6 pl-1"></img>
                </button>
              </a>
              <hr className="border-gray-400 my-2"></hr>
              <a
                rel="noreferrer"
                href="https://news.google.com/articles/CBMiY2h0dHBzOi8vcmVzZWFyY2guY2hlY2twb2ludC5jb20vMjAyNC9ldGhlcmV1bXMtY3JlYXRlMi1hLWRvdWJsZS1lZGdlZC1zd29yZC1pbi1ibG9ja2NoYWluLXNlY3VyaXR5L9IBAA?hl=en-GB&gl=GB&ceid=GB%3Aen"
                target="_blank"
              >
                <button className="flex items-center hover:brightness-0 duration-200 pt-2">
                  <p className="regular text-gray-600 text-sm text-left">
                    Ethereums create2 a double edged sword in blockchain
                    security
                  </p>
                  <img src={arrowRight} className="h-6 pl-1"></img>
                </button>
              </a>
              <hr className="border-gray-400 my-2"></hr>
              <a
                href="https://techxplore.com/news/2024-03-team-blockchain-based-method-personal.html"
                rel="noreferrer"
                target="_blank"
              >
                <button className="flex items-center hover:brightness-0 duration-200 pt-2">
                  <p className="regular text-gray-600 text-sm text-left">
                    Team develops blockchain-based method to protect personal
                    data on the internet
                  </p>
                  <img src={arrowRight} className="h-6 pl-1"></img>
                </button>
              </a>
              <hr className="border-gray-400 my-2"></hr>
              <a
                href="https://news.bitcoin.com/wu-tangs-ghostface-killah-to-release-exclusive-music-collection-on-bitcoin-blockchain/"
                rel="noreferrer"
                target="_blank"
              >
                <button className="flex items-center hover:brightness-0 duration-200 pt-2">
                  <p className="regular text-gray-600 text-sm text-left">
                    Wu-Tang's Ghostface Killah to Release Music Collection on
                    Bitcoin Blockchain
                  </p>
                  <img src={arrowRight} className="h-6 pl-1"></img>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
      {LoginMessageActive ? (
        <LoginMessage
          loginMessage={loginMessage}
          setLoginMessageActive={setLoginMessageActive}
        ></LoginMessage>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Main;
