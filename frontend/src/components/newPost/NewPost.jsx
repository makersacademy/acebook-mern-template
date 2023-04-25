import React from "react";
import SubmitButton from "../submitButton/SubmitButton";

const NewPost = ({ navigate }) => {
  return (
    <>
      <form action="post" id="post" className="new-post-form">
        <input
          type="text"
          class="new-post-input"
          placeholder="Tell people how you're feeling..."
        />
      </form>
      <SubmitButton
        navigate={navigate}
        routePath={"/feed"}
        text={"Add to Feed"}
        form={"post"}
      />
    </>
  );
};

export default NewPost;
