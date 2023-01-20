import "./CreatePost.css";
import { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import UploadWidget from './UploadWidget'

const CreatePost = ({setUpdated}) => {
  const [postInput, setPostInput] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showWidget, setShowWidget] = useState(false)
  const [imageInput, setImageInput] = useState("")
  const token = window.localStorage.getItem("token");

  const handlePopUp = () => {
    setShowPopup(!showPopup);
    // document.body.classList.toggle("disable-pointer-events", !showPopup);
    setPostInput("");
  };  

  const handlePostInput = (event) => {
    setPostInput(event.target.value);
  };

  const handleImageUpload =  (event) => {
    // Event listener to get the hosted image info
    setImageInput(event.info.url);
    console.log(`image input should be ${event.info.url}`);
    const imageUrl = event.info.url;
    console.log(imageUrl)
    setShowWidget(true);
    console.log(`image input is  ${event.info.url}`);
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

    if (event.target.getAttribute("data-button-id") !== "submit-post") {
      return;
    }

    if (showWidget === false && imageInput !== "") {
      return
    }

    let response = await fetch("/posts", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message: postInput, author: window.localStorage.getItem("user_id"), image: imageInput }),
    });

    if (response.status === 201) {
      setPostInput("");
      setImageInput("");
      setShowWidget(false);
      setShowPopup(false);
      setUpdated(true);
      document.body.classList.toggle("disable-pointer-events", !showPopup);
    }
  };

  return (
    <div className="container">
      <form className="my-form" onSubmit={handleSubmit}>
        <textarea
          className="feed-textarea"
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
              className="popup-textarea"
              placeholder="What's on your mind?"
              value={postInput}
              onChange={handlePostInput}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              autoFocus
            />
            < UploadWidget handleImageUpload={handleImageUpload} buttonText="Upload Image"/>
            <button data-button-id="submit-post" className="submit-post" onClick={handleSubmit}>
              Post
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
