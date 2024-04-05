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

      <div className="h-[25vh] mt-8 sm:h-[50vh] w-[70vw] mx-auto flex items-center justify-between">
        <div className="w-[30rem]">
          <h1 className="text-2xl text-white sm:text-5xl md:text-7xl bold">
            Find Solutions
          </h1>
          <h2 className="text-base mt-2 sm:text-xl md:text-3xl text-slate-300">
            The #1 Cryptocurrency Forum on the Blockchain
          </h2>
        </div>

        <img className="hidden sm:block h-full pt-16" src={heroImage}></img>
      </div>
      <div className="bg-white sm:pt-8 pt-4">
        <div className="md:w-[70vw] md:mx-auto sm:flex justify-between">
          <div className="mx-2 sm:mx-4 md:mx-0 sm:w-[70%]">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 mx-2 sm:mx-0">
              <h3 className="text-xl sm:text-4xl bold pb-1 mr-2 sm:pb-0">
                Browse Forum Messages
              </h3>

              <button
                className="text-sm sm:text-base w-36 sm:w-auto bg-black px-4 py-2 sm:py-4 rounded hover:bg-gray-600 duration-200 text-white regular"
                onClick={() => handleOpenPostForm()}
              >
                ASK A QUESTION
              </button>
            </div>
            <div className="flex flex-col sm:flex-row sm:place-items-center mb-6 sm:mb-0 mx-2 sm:mx-0">
              <p className="bold mr-4 text">Sort By:</p>
              <div>
                <button
                  className="px-2 sm:px-3 py-1 rounded duration-200 mr-2 sm:mr-4"
                  onClick={() => handleSortByDate()}
                  style={{
                    backgroundColor:
                      sortedBy === "upVotes" ? "black" : "#4B5563",
                  }}
                >
                  <p className="text-xs sm:text-sm text-white regular">
                    Most Recent
                  </p>
                </button>
                <button
                  className="px-2 sm:px-3 py-1 rounded duration-200"
                  onClick={() => handleSortByUpVotes()}
                  style={{
                    backgroundColor:
                      sortedBy === "upVotes" ? "#4B5563" : "black",
                  }}
                >
                  <p className="text-xs sm:text-sm text-white regular">
                    Most Popular
                  </p>
                </button>
              </div>
            </div>
            <div>
              {postFormActive ? (
                <PostForm
                  handleTogglePostForm={handleTogglePostForm}
                  setNewPostTitle={setNewPostTitle}
                  handleSortByDate={handleSortByDate}
                  Url={Url}
                  profileData={profileData}
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
                    profileData={profileData}
                  ></Post>
                );
              })
            )}
          </div>
          <div className="bg-gray-200 h-fit mx-2 my-4 sm:my-0 md:m-0 sm:w-[25%] p-6 flex flex-col justify-center items-center rounded">
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
