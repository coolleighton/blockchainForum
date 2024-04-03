import messageIcon from "../images/messageIcon.png";
import { useState } from "react";

const PostForm = ({
  handleTogglePostForm,
  setNewPostTitle,
  handleSortByDate,
  Url,
  profileData,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    author: profileData,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    setNewPostTitle(formData.title); // tiggers messages API to request new data
    handleSortByDate();

    try {
      const response = await fetch(Url + "/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Post created successfully");
        handleTogglePostForm();
        // Handle success: maybe display a success message
      } else {
        console.error("Error creating post");
        // Handle error: maybe display an error message
      }
    } catch (error) {
      console.error("Error creating post:", error.message);
      // Handle network errors or other unexpected errors
    }
  };

  return (
    <div className="border-[1px] border-gray-400 mt-4 p-4 rounded">
      <div>
        <img src={messageIcon} className="h-6 mb-2"></img>
        <form onSubmit={handleSubmit}>
          <p className="text-gray-400 text-xs mb-4">
            Write a Post as <span className="text-blue-400">{profileData}</span>
          </p>
          <label className="block text-md mb-2" htmlFor="title">
            Post Title
          </label>
          <input
            className="block mb-2 w-full"
            name="title"
            placeholder="Ask your question here"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <hr></hr>
          <label className="block text-md mt-4 mb-2" htmlFor="extra">
            Description
          </label>
          <textarea
            className="block w-full h-20 p-2 border-[1px]"
            name="text"
            placeholder="Have any extra information?"
            type="text"
            value={formData.text}
            onChange={handleChange}
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
