import GlobalFunctions from "../../globalFunctions";
import upArrow from "../../images/upArrow.png";
import downArrow from "../../images/downArrow.png";

const Comment = ({ comment }) => {
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
};

export default Comment;
