import upArrow from "../../../images/upArrow.png";
import downArrow from "../../../images/downArrow.png";
import "./Post.css";
import GlobalFunctions from "../../../globalFunctions";
import { useState } from "react";
import Comment from "../Comment";
import CommentForm from "../CommentForm";

const Post = ({
  backendData,
  setBackendData,
  data,
  loggedIn,
  setLoginMessage,
  setLoginMessageActive,
  Url,
  profileData,
}) => {
  const [commentsActive, setCommentsActive] = useState(false);
  const [commentUpVoted, setCommentUpVoted] = useState(false);
  const [commentDownVoted, setCommentDownVoted] = useState(false);

  let commentsLength = 0;
  if (data.comments) {
    commentsLength = data.comments.length;

    const handleOpenReplies = () => {
      if (commentsActive === false) {
        setCommentsActive(true);
      } else {
        setCommentsActive(false);
      }
    };

    const handleUpVote = async (id, direction) => {
      if (loggedIn) {
        let amount = data.upVotes;

        console.log(data.upVotes);

        if (direction === "up") {
          if (commentDownVoted === true && commentUpVoted === false) {
            setCommentUpVoted(true);
            setCommentDownVoted(false);
            amount = amount + 2;
          } else if (commentDownVoted === false && commentUpVoted === false) {
            setCommentUpVoted(true);
            amount = amount + 1;
          } else if (commentDownVoted === false && commentUpVoted === true) {
            setCommentUpVoted(false);
            amount = amount - 1;
          }
        } else {
          if (commentUpVoted === true && commentDownVoted === false) {
            setCommentDownVoted(true);
            setCommentUpVoted(false);
            amount = amount - 2;
          } else if (commentUpVoted === false && commentDownVoted === false) {
            setCommentDownVoted(true);
            amount = amount - 1;
          } else if (commentUpVoted === false && commentDownVoted === true) {
            setCommentDownVoted(false);
            amount = amount + 1;
          }
        }

        // update client

        const amendedPostsData = backendData.map((post) => {
          if (post._id === id) {
            post.upVotes = amount;
            return post;
          } else return post;
        });

        setBackendData(amendedPostsData);

        // update server

        try {
          const response = await fetch(Url + "/messages/postUpVote", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: amount, id: id }),
          });

          if (response.ok) {
            console.log("upvote created successfully");
            // Handle success: maybe display a success message
          } else {
            console.error("Error creating upvote");
            // Handle error: maybe display an error message
          }
        } catch (error) {
          console.error("Error creating upvote:", error.message);
          // Handle network errors or other unexpected errors
        }

        // addUpvote_post

        try {
          const response = await fetch(Url + "/users/addUpvote", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              upvotedPostId: "testpostid",
              userId: "testuserid",
              upVote: "testuserid",
            }),
          });

          if (response.ok) {
            console.log("user upvote created successfully");
            // Handle success: maybe display a success message
          } else {
            console.error("Error creating user upvote");
            // Handle error: maybe display an error message
          }
        } catch (error) {
          console.error("Error creating user upvote:", error.message);
          // Handle network errors or other unexpected errors
        }
      } else {
        setLoginMessage("ask a question");
        setLoginMessageActive(true);
      }
    };

    return (
      <div
        key={data._id}
        className="border-[1px] border-gray-400 mt-4 p-4 rounded"
      >
        <div className="flex">
          <div className="flex justify-between items-start w-full">
            <div className="w-full">
              <div className="flex justify-between mb-4">
                <div className="flex items-center">
                  <div
                    className="OPprofileCircle mr-2"
                    style={{
                      backgroundColor: GlobalFunctions.returnRandomColor(
                        GlobalFunctions.returnFirstLetter(data.author)
                      ),
                    }}
                  >
                    {GlobalFunctions.returnFirstLetter(data.author)}
                  </div>
                  <p className="text-sm text-gray-400 sm:text-center">
                    By {data.author}
                  </p>
                </div>

                <div className="flex items-center">
                  <button
                    className="flex mr-1 items-center hover:scale-125 duration-200"
                    onClick={() => {
                      handleUpVote(data._id, "up");
                    }}
                  >
                    <img
                      style={{
                        filter: commentUpVoted
                          ? "contrast(200%)"
                          : "contrast(100%)",
                      }}
                      className="h-4"
                      src={upArrow}
                    ></img>
                  </button>
                  <p className="mr-1 bold">{data.upVotes}</p>
                  <button
                    className="flex items-center hover:scale-125  duration-200"
                    onClick={() => {
                      handleUpVote(data._id, "down");
                    }}
                  >
                    <img
                      className="h-4"
                      src={downArrow}
                      style={{
                        filter: commentDownVoted
                          ? "contrast(200%)"
                          : "contrast(100%)",
                      }}
                    ></img>
                  </button>
                </div>
              </div>
              <p className="text-xl bold">{data.title}</p>
              <p className="text-lg">{data.text}</p>
              <p className="text-sm mt-3 text-gray-400">
                Posted {GlobalFunctions.returnConvertedDate(data.posted)}
              </p>

              <div>
                <button
                  className="bg-black px-3 py-1 rounded mt-4 hover:bg-gray-600 duration-200 mr-4"
                  onClick={() => handleOpenReplies()}
                >
                  {commentsActive ? (
                    <p className="text-sm text-white regular">Hide Comments</p>
                  ) : (
                    <p className="text-sm text-white regular">
                      {commentsLength === 0
                        ? "Leave a Comment"
                        : commentsLength === 1
                        ? "See " + commentsLength + " Comment"
                        : "See " + commentsLength + " Comments"}
                    </p>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: commentsActive ? "block" : "none" }}>
          {data.comments.map((comment) => {
            return (
              <Comment
                backendData={backendData}
                setBackendData={setBackendData}
                comment={comment}
                id={data._id}
                loggedIn={loggedIn}
                setLoginMessage={setLoginMessage}
                setLoginMessageActive={setLoginMessageActive}
                Url={Url}
              ></Comment>
            );
          })}

          <hr className="my-4"></hr>
          <CommentForm
            backendData={backendData}
            setBackendData={setBackendData}
            id={data._id}
            loggedIn={loggedIn}
            setLoginMessage={setLoginMessage}
            setLoginMessageActive={setLoginMessageActive}
            Url={Url}
            profileData={profileData}
          ></CommentForm>
        </div>
      </div>
    );
  }
};

export default Post;
