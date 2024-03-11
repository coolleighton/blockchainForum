import upArrow from "../images/upArrow.png";
import downArrow from "../images/downArrow.png";
import messageIcon from "../images/messageIcon.png";
import hideReplies from "../images/hideReplies.png";
import { useState } from "react";

const Post = ({ data }) => {
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
      <div key={data.id} className=" border-[1px] mt-6 p-4 rounded">
        <div className="flex justify-between items-start">
          <div>
            <img src={messageIcon} className="h-6 mb-2"></img>
            <p className="text-xl bold">This will be the title?</p>
            <p className="text-lg">{data.text}</p>

            <p className="text-sm mt-2 text-gray-400">
              By {data.author}, {data.posted}
            </p>
            <div>
              <button
                className="bg-black px-3 py-1 rounded mt-6 hover:bg-gray-600 duration-200 mr-4"
                onClick={() => handleOpenReplies()}
              >
                {commentsActive ? (
                  <p className="text-sm text-white regular">Hide Comments</p>
                ) : (
                  <p className="text-sm text-white regualr">
                    {commentsLength === 1
                      ? "See " + commentsLength + " comment"
                      : "See " + commentsLength + " comments"}
                  </p>
                )}
              </button>
              <button className="bg-black px-3 py-1 rounded mt-6 hover:bg-gray-600 duration-200">
                <p className="text-sm text-white regular">Add a Comment</p>
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
        <div style={{ display: commentsActive ? "block" : "none" }}>
          {data.comments.map((comment) => {
            return (
              <div>
                <hr className="my-4"></hr>
                <div className="flex justify-between items-start">
                  <div>
                    <div>
                      <p>{comment.Comment}</p>
                    </div>
                    <p className="text-sm mt-1 text-gray-400">
                      By {comment.user}, {comment.posted}
                    </p>
                  </div>

                  <div className="flex">
                    <button className="flex mr-2 items-center hover:contrast-150 duration-200">
                      <img className="h-4" src={upArrow}></img>
                      <p className="upArrow">{comment.upVotes}</p>
                    </button>
                    <button className="flex items-center hover:contrast-150 duration-200">
                      <img className="h-4" src={downArrow}></img>
                      <p className="downArrow">{comment.downVotes}</p>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default Post;
