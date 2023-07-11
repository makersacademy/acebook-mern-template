import React, { useState } from "react";
import '../../index.css';


const CreatePost = ({ handleRefresh }) => {
  const [message, setMessage] = useState("");
  const [token] = useState(window.localStorage.getItem("token"));
  const [file, setFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const jsonData = {
      message: message,
      createdAt: new Date().toISOString(),
    };
    
    const formData = new FormData(); // added this line to convert data to JSON, also added the image file. 
    formData.append("data", JSON.stringify(jsonData));
    formData.append("photo", file);


    let response = await fetch("/posts", {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // changed this line from "application/json"
        body: formData  // changed this line to formData
      },
      // removed this line, and added const above fetch req was: body: JSON.stringify({ message: message, createdAt: new Date().toISOString() }),
      
    });

    // amend the fetch request, to include sending across a photo...

    if (response.ok) {
      setMessage(""); 
      handleRefresh(); 
      setFile(null);
    }

  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };


  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      Post:{" "}
      <input
        id="message"
        type="text"
        value={message}
        onChange={handleMessageChange}
      />
        <input
        id="photo"
        type="file"
        onSubmit={handleFileChange}
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

export default CreatePost;
