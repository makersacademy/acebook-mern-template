import { useState } from "react";
import "./CreateComment.css";
import UploadWidget from '../CreatePost/UploadWidget'

const CreateComment = ({post_id, setUpdated}) => {
  
  // Possibly take in setUpdated as a prop, then update this to true when we post a comment
    // Above might need to go in post.js rather than createComment.js

  const [commentInput, setCommentInput] = useState("");
  const [showWidget, setShowWidget] = useState(false)
  const [imageInput, setImageInput] = useState("")
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

  const handleImageUpload = (event) => {
    // Event listener to get the hosted image info
      console.log(`image input should be ${event.info.url}`);
      const imageUrl = event.info.url;
      console.log(imageUrl)
      setImageInput(imageUrl);
      setShowWidget(true)
      console.log(`image input is  ${imageInput}`);
    };

  const handleSubmit = async (event) => {
    // Stop page from refreshing
    event.preventDefault();
    
    // If your comment is empty no post request is created
    if (commentInput === "") {
      return;
    }

    if (showWidget === false && imageInput !== "") {
      return
    }

    const response = await fetch(`/comments/${post_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message: commentInput, post_id: post_id, author: window.localStorage.getItem("user_id"), image: imageInput }),
    });

    // const json = await response.json();

    // if (!response.ok) {
    //   setError(json.error);
    //   console.log(error);
    // }

    if (response.status === 200) {
      setCommentInput("");
      setError(null);
      setImageInput("");
      setShowWidget(false);
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
      < UploadWidget handleImageUpload={handleImageUpload}/>
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