import messageIcon from "../images/messageIcon.png";

const PostForm = ({ handleTogglePostForm }) => {
  return (
    <div className="border-[1px] border-gray-400 mt-8 p-4 rounded">
      <div>
        <img src={messageIcon} className="h-6 mb-2"></img>
        <form action="" method="POST">
          <p className="text-gray-400 text-xs mb-4">
            Write a Post as <span className="text-blue-400">Cooleighton</span>
          </p>
          <label className="block text-md mb-2" htmlFor="title">
            Post Title
          </label>
          <input
            className="block mb-2 w-full"
            name="title"
            placeholder="Ask your question here"
            type="text"
            required
          />
          <hr></hr>
          <label className="block text-md mt-4 mb-2" htmlFor="extra">
            Description
          </label>
          <textarea
            className="block w-full h-20 p-2 border-[1px]"
            name="extra"
            placeholder="Have any extra information?"
            type="text"
            required
          ></textarea>
          <div className="flex justify-end mt-4">
            <div
              onClick={() => handleTogglePostForm()}
              className="flex items-center mr-4 bg-black text-white px-4 h-7 rounded text-sm hover:bg-gray-700 duration-200 cursor-pointer"
            >
              <p>Cancel</p>
            </div>
            <button className="bg-black text-white px-4 h-7  rounded text-sm hover:bg-gray-700 duration-200">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
