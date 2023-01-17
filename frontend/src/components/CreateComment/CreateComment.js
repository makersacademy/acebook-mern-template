import { useState } from "react";

const CreateComment = () => {
  
  // Possibly take in setUpdated as a prop, then update this to true when we post a comment
    // Above might need to go in post.js rather than createComment.js


  const [commentInput, setCommentInput] = useState("");

  const handleCommentInput = (event) => {
    setCommentInput(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      console.log(commentInput);
      // handleSubmit(event);
    }
  };

  return ( 
    <div className="form-container">
      <form className="my-comment-form">
        <textarea
          type="text"
          placeholder="Write a comment..."
          onChange={handleCommentInput}
          onKeyDown={handleKeyDown}
        />
      </form>
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