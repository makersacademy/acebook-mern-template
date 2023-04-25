import React from "react";
import Button from "../button/Button";

const NewPost = ({ navigate }) => {
  return (
    <>
      <Button navigate={navigate} routePath={"/feed"} text={"Add to Feed"} />
    </>
  );
};

export default NewPost;
