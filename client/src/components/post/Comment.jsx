import GlobalFunctions from "../../globalFunctions";
import upArrow from "../../images/upArrow.png";
import downArrow from "../../images/downArrow.png";
import { useState } from "react";

const Comment = ({
  comment,
  id,
  setNewPostTitle,
  loggedIn,
  setLoginMessage,
  setLoginMessageActive,
  Url,
}) => {
  const [commentUpVoted, setCommentUpVoted] = useState(false);
  const [commentDownVoted, setCommentDownVoted] = useState(false);

  const handleUpVote = async (direction) => {
    if (loggedIn) {
      let amount = 0;

      if (direction === "up") {
        amount = comment.upVotes;
        if (commentDownVoted === true && commentUpVoted === false) {
          setCommentUpVoted(true);
          setCommentDownVoted(false);
          amount = amount + 1;
        } else if (commentDownVoted === false && commentUpVoted === false) {
          setCommentUpVoted(true);
        } else if (commentDownVoted === false && commentUpVoted === true) {
          setCommentUpVoted(false);
          amount = amount - 2;
        }
      } else {
        amount = comment.upVotes - 2;
        if (commentUpVoted === true && commentDownVoted === false) {
          setCommentDownVoted(true);
          setCommentUpVoted(false);
          amount = amount - 1;
        } else if (commentUpVoted === false && commentDownVoted === false) {
          setCommentDownVoted(true);
        } else if (commentUpVoted === false && commentDownVoted === true) {
          setCommentDownVoted(false);
          amount = amount + 2;
        }
      }

      try {
        const response = await fetch(Url + "/messages/commentUpVote", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: amount,
            postId: id,
            commentId: comment._id,
          }),
        });

        if (response.ok) {
          console.log("Post created successfully");
          // Handle success: maybe display a success message
        } else {
          console.error("Error creating post");
          // Handle error: maybe display an error message
        }
      } catch (error) {
        console.error("Error creating post:", error.message);
        // Handle network errors or other unexpected errors
      }
      setNewPostTitle(amount + id); // tiggers messages frontend API to request new data
    } else {
      setLoginMessage("ask a question");
      setLoginMessageActive(true);
    }
  };

  return (
    <div>
      <hr className="my-4"></hr>
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <div
            className="profileCircle mr-2"
            style={{
              backgroundColor: GlobalFunctions.returnRandomColor(
                GlobalFunctions.returnFirstLetter(comment.user)
              ),
            }}
          >
            {GlobalFunctions.returnFirstLetter(comment.user)}
          </div>
          <div className="flex-col">
            <div>
              <p>{comment.Comment}</p>
            </div>
            <div className="mt-1 flex">
              <p className="text-xs mr-2 text-gray-400">By {comment.user}</p>
              <p className="text-xs  text-gray-400">
                Posted {GlobalFunctions.returnConvertedDate(comment.posted)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex">
          <button
            onClick={() => handleUpVote("up")}
            className="flex mr-1 items-center hover:contrast-150 duration-200"
          >
            <img
              style={{
                filter: commentUpVoted ? "contrast(200%)" : "contrast(100%)",
              }}
              className="h-4"
              src={upArrow}
            ></img>
          </button>
          <p className="mr-1 bold">{comment.upVotes}</p>
          <button className="flex items-center hover:contrast-150 duration-200">
            <img
              style={{
                filter: commentDownVoted ? "contrast(200%)" : "contrast(100%)",
              }}
              className="h-4"
              src={downArrow}
              onClick={() => handleUpVote("down")}
            ></img>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
