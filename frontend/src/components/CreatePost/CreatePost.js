import "./CreatePost.css";
import { useState } from "react";
import { FaWindowClose } from "react-icons/fa";

const CreatePost = () => {
  const [postInput, setPostInput] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const token = window.localStorage.getItem("token");

  const handlePopUp = () => {
    setShowPopup(!showPopup);
    document.body.classList.toggle("darken-background", !showPopup);
    document.body.classList.toggle("disable-pointer-events", !showPopup);
    setPostInput("");
  };  

  const handlePostInput = (event) => {
    setPostInput(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    } else if (event.key === "Escape") {
      handlePopUp();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (postInput === "") {
      return;
    }

    let response = await fetch("/posts", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message: postInput }),
    });

    if (response.status === 201) {
      setPostInput("");
      setShowPopup(false);
      document.body.classList.toggle("darken-background", !showPopup);
      document.body.classList.toggle("disable-pointer-events", !showPopup);
    }
  };

  return (
    <div className="container">
      <form className="my-form" onSubmit={handleSubmit}>
        <input
          placeholder={showPopup ? "" : "What's on your mind?"}
          id="new-post-input"
          type="text"
          onClick={handlePopUp}
          autoComplete="off"
          disabled={showPopup}
          readOnly
        />
        {showPopup && (
          <div className="popup">
            <button className="exit-post-icon" onClick={handlePopUp}>
              <FaWindowClose size={15} color="dark-gray" />
            </button>
            <textarea
              placeholder="What's on your mind?"
              value={postInput}
              onChange={handlePostInput}
              onKeyDown={handleKeyDown}
              autoComplete="off"
            />
            <button className="submit-post" onClick={handleSubmit}>
              Post
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
