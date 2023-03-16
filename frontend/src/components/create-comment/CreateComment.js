import React, { useState } from "react";

const CreateComment = (props) => {
  const [comment, setComment] = useState("");

  const handleSubmit = async (event) => {
    //need a new endpoint for this
    let response = await fetch("/posts/" + props.postId + "/comments", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ comment: comment }),
    });

    if (response.status === 201) {
      console.log("comment is successful");
      props.fetchData();
    } else {
      console.log("comment did not complete");
    }
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Comment"
        id="comment"
        type="text"
        value={comment}
        onChange={handleCommentChange}
      />
      <input role="submit-button" id="submit" type="submit" value="Submit" />
    </form>
  );
};

export default CreateComment;
