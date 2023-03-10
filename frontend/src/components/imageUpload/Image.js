import React, { useState } from "react";

// localhost:3000/image
// localhost:8080/images

const Image = () => {
  const [inputValue, setInputValue] = useState("");
  const [imageResponse, setimageResponse] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const submitHandler = async (event) => {
    // 1. prevent React app to refresh
    event.preventDefault();

    // 2. upload the input to Cloudinary
    const formData = new FormData();
    formData.append("file", inputValue);
    formData.append("upload_preset", "llzecft2");
    if (token) {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/ddav2oh8j/image/upload",
        {
          method: "post",
          body: formData,
        }
      );
      const data = await response.json();
      console.log(data);

      // 3. save the publicId to the database
      const imageRes = await fetch("/images", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "post",
        body: JSON.stringify({ publicId: data.public_id }),
      });
      const imageData = await imageRes.json();

      window.localStorage.setItem("token", imageData.token);
      setToken(window.localStorage.getItem("token"));
      setimageResponse(imageData);
    } else {
      console.log("You don't have a token!");
    }
    // console.log(response)
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <input onChange={(e) => setInputValue(e.target.files[0])} type="file" />
        <input type="submit" />
      </form>
      <p>{imageResponse.public_id}</p>
    </>
  );
};

export default Image;
