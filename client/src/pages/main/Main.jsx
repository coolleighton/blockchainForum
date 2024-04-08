import "./main.css";
import heroImage from "../../images/heroImage.png";

import Header from "../../components/header.jsx";
import Post from "../../components/post/PostComponent/Post.jsx";
import PostForm from "../../components/PostForm.jsx";
import LoginMessage from "../../components/LoginMessage.jsx";
import News from "../../components/News.jsx";
import Footer from "../../components/Footer.jsx";
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
  const [listSize, setListSize] = useState(10);

  // handle the show more button clicks

  const handleShowMore = () => {
    let newListSize = listSize + 10;
    if (newListSize > backendData.length) {
      newListSize = backendData.length;
    }
    setListSize(newListSize);
  };

  // handle the show less button clicks

  const handleShowLess = () => {
    let newListSize = 10;
    setListSize(newListSize);
  };

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

  console.log(sortedData);

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

        <img
          className="hidden sm:block h-full pt-16"
          src={heroImage}
          alt="man working on laptop"
        ></img>
      </div>
      <div className="bg-white sm:pt-8 pt-4 pb-2 sm:pb-0">
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
            <div className="flex flex-col sm:flex-row mb-6 sm:mb-0 mx-2 sm:mx-0">
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
              backendData.slice(0, listSize).map((sortedData) => {
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
            <div className="flex flex-col sm:flex-row w-[100%] justify-end items-center mt-4 mb-4 sm:mb-12">
              <p className="sm:pr-4 text-sm mb-2">
                Showing {listSize} of {backendData.length}
              </p>
              <div>
                <button
                  className="text-sm sm:text-base mr-2 mb-2 bg-black px-3  py-1 rounded hover:bg-gray-600 duration-200 text-white regular"
                  onClick={() => handleShowLess()}
                >
                  Show Less
                </button>
                <button
                  className="text-sm sm:text-base bg-black px-3 py-1 rounded hover:bg-gray-600 duration-200 text-white regular"
                  onClick={() => handleShowMore()}
                >
                  Show More
                </button>
              </div>
            </div>
          </div>
          <News></News>
        </div>
      </div>
      <Footer></Footer>

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
