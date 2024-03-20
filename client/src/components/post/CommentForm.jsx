import { useState } from "react";

const CommentForm = ({
  id,
  setNewPostTitle,
  loggedIn,
  setLoginMessage,
  setLoginMessageActive,
  Url,
}) => {
  const [commentData, setCommentData] = useState({
    comment: "",
    id: id,
  });

  const handleChange = (e) => {
    setCommentData({
      ...commentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loggedIn) {
      console.log(commentData);

      try {
        const response = await fetch(Url + "/messages/comment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commentData),
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
      setNewPostTitle(commentData.comment); // tiggers messages API to request new data
      setCommentData({
        // clear comments text area
        ...commentData,
        comment: "",
      });
    } else {
      setLoginMessage("ask a question");
      setLoginMessageActive(true);
    }
  };

  return (
    <form action="/messages/comment" method="POST" onSubmit={handleSubmit}>
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
        value={commentData.comment}
        onChange={handleChange}
        required
      ></textarea>

      <button className="bg-black text-white px-4 h-7 mt-4 rounded text-sm hover:bg-gray-700 duration-200">
        Submit
      </button>
    </form>
  );
};

export default CommentForm;
