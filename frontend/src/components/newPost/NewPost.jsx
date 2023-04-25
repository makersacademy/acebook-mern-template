import React from "react";
import SubmitButton from "../submitButton/SubmitButton";

const NewPost = ({ navigate }) => {
  return (
    <>
      <form action="post" id="post" className="new-post-form">
        <input>Tell people how you're feeling...</input>
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
