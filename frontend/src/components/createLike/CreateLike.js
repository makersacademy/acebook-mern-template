import React, { useState } from "react";
import { useParams } from "react-router-dom";
import '../../index.css'


const CreateLike = ({ handleRefresh }) => {
  const [token] = useState(window.localStorage.getItem("token"));
  const params = useParams();


  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch(`/likes/${params.id}`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    if (response.ok) {
      handleRefresh(); 
    }

  };

  return (
   <button onClick={handleSubmit}>like post</button>
   
  );
};

export default CreateLike;
