import { useState } from "react";
import "./CreateComment.css";

const CreateComment = ({post_id, setUpdated}) => {
  const [commentInput, setCommentInput] = useState("");
  const [error, setError] = useState(null);

  const token = window.localStorage.getItem("token");

  const handleCommentInput = (event) => {
    setCommentInput(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      console.log(commentInput);
      handleSubmit(event);
    }
  };

  const handleSubmit = async (event) => {
    // Stop page from refreshing
    event.preventDefault();
    
    // If your comment is empty no post request is created
    if (commentInput === "") {
      return;
    }

    const response = await fetch(`/comments/${post_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message: commentInput, post_id: post_id, author: window.localStorage.getItem("user_id") }),
    });

    // const json = await response.json();

    // if (!response.ok) {
    //   setError(json.error);
    //   console.log(error);
    // }

    if (response.status === 200) {
      setCommentInput("");
      setError(null);
      setUpdated(true);
      console.log("Post request successful")
      // setUpdated(true);
    }
  };

  return ( 
    <div className="form-container">
      <form className="new-comment-form">
        <textarea
          className="comment-textarea"
          type="text"
          placeholder="Write a comment..."
          autoComplete="off"
          autoFocus
          value={commentInput}
          onChange={handleCommentInput}
          onKeyDown={handleKeyDown}
        />
      </form>
      <p className="press-enter-to-post">Press Enter to post</p>
    </div>
    // Form
      // Input field
      // Starts as a text area
      // size - one line, length of comment box (minus margin)
      // Placeholder text: "Write a comment..."
      // Input field value is changed as you type
      // NO submit button, just enter: onKeyDown={handleKeyDown}
        // (handleKeyDown then submits the comment when 'enter' is pressed)

      // 
  );
}
 
export default CreateComment;