import React, { useState } from "react";
import { useParams } from "react-router-dom";
import '../../index.css'


const CreateComment = ({ handleRefresh }) => {
  const [message, setMessage] = useState("");
  const [token] = useState(window.localStorage.getItem("token"));
  const params = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch(`/comments/${params.id}`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment: message, createdAt: new Date().toISOString()  }),
    });

    if (response.ok) {
      setMessage(""); 
      handleRefresh(); 
    }

  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      Comment:{" "}
      <input
        id="message"
        type="text"
        value={message}
        onChange={handleMessageChange}
      />
      <input 
      role="submit-button" 
      id="submit" 
      type="submit" 
      value="Submit" 
      className="submit-button" />
    </form>
  );
};

export default CreateComment;
