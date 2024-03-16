import upArrow from "../images/upArrow.png";
import downArrow from "../images/downArrow.png";
import "./Post.css";
import GlobalFunctions from "../globalFunctions";
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
      <div
        key={data.id}
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
                    <p className="text-sm text-white regualr">
                      {commentsLength === 1
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
          <div>
            {data.comments.map((comment) => {
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
                      <div>
                        <div>
                          <p>{comment.Comment}</p>
                        </div>
                        <div className="mt-1 flex">
                          <p className="text-xs mr-2 text-gray-400">
                            By {comment.user}
                          </p>
                          <p className="text-xs  text-gray-400">
                            Posted {comment.posted}
                          </p>
                        </div>
                      </div>
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
          <hr className="my-4"></hr>
          <form action="" method="POST">
            <p className="text-gray-400 text-xs mb-1">
              Comment as <span className="text-blue-400">Cooleighton</span>
            </p>
            <label className="block text-md medium mb-4" htmlFor="comment">
              Leave a Comment Here
            </label>

            <textarea
              className="block w-full h-20 p-2 border-[1px]"
              name="comment"
              placeholder="What are your thoughts?"
              required
            ></textarea>

            <button className="bg-black text-white px-4 h-7 mt-4 rounded text-sm hover:bg-gray-700 duration-200">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
};

export default Post;
