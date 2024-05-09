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
  setBackendData,
  loggedIn,
  handleLogout,
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
    <div key="main-component" className="flex-col bg-black relative">
      <Header
        key="header-component"
        loggedIn={loggedIn}
        handleLogout={handleLogout}
        profileData={profileData}
      ></Header>

      <div
        key="hero-component"
        className="h-[25vh] mt-8 sm:h-[50vh] w-[70vw] mx-auto flex items-center justify-between"
      >
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
      <div
        className="bg-white sm:pt-8 pt-4 pb-2 sm:pb-0"
        key="mainawarea-component"
      >
        <div
          className="md:w-[70vw] md:mx-auto sm:flex justify-between"
          key="tester342341"
        >
          <div className="mx-2 sm:mx-4 md:mx-0 sm:w-[70%]" key="tester1">
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
                  handleSortByDate={handleSortByDate}
                  Url={Url}
                  profileData={profileData}
                  setBackendData={setBackendData}
                  backendData={backendData}
                ></PostForm>
              ) : (
                <></>
              )}
            </div>

            {backendData.length === 1 ? (
              <div
                role="status"
                className="flex justify-center mt-20 mb-32"
                key="loading"
              >
                <svg
                  aria-hidden="true"
                  className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-black"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              backendData.slice(0, listSize).map((sortedData) => {
                return (
                  <Post
                    key={sortedData.id}
                    backendData={backendData}
                    setBackendData={setBackendData}
                    data={sortedData}
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
          <News key="news-component"></News>
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
