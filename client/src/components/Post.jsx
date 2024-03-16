import upArrow from "../images/upArrow.png";
import downArrow from "../images/downArrow.png";
import "./Post.css";
import GlobalFunctions from "../globalFunctions";
import { useState } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const Post = ({ data, setNewPostTitle }) => {
  const [commentsActive, setCommentsActive] = useState(false);

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

    return (
      <div
        key={data._id}
        className=" border-[1px] border-gray-400 mt-4 p-4 rounded"
      >
        <div className="flex">
          <div className="flex justify-between items-start w-full">
            <div>
              <div className="flex items-center mb-4">
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
                <p className="text-sm text-gray-400 text-center">
                  By {data.author}
                </p>
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
            <div className="flex w-[15rem] justify-end">
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
        </div>

        <div style={{ display: commentsActive ? "block" : "none" }}>
          {data.comments.map((comment) => {
            return <Comment comment={comment}></Comment>;
          })}

          <hr className="my-4"></hr>
          <CommentForm
            id={data._id}
            setNewPostTitle={setNewPostTitle}
          ></CommentForm>
        </div>
      </div>
    );
  }
};

export default Post;
