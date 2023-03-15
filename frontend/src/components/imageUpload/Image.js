/* eslint-disable react/destructuring-assignment */
import React, { useState, useContext } from "react";
import { AdvancedImage } from "@cloudinary/react";
import { CloudinaryContext } from "../../contexts/cloudinaryContext";

const Image = () => {
  const [isError, setIsError] = useState(false);
  const [inputValue, setInputValue] = useState(null);
  const [imageResponse, setimageResponse] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const cld = useContext(CloudinaryContext);

  const myImage = cld.image(imageResponse.public_id);

  const submitHandler = async (event) => {
    setIsError(false);
    // 1. prevent React app to refresh
    event.preventDefault();

    // 2. upload the input to Cloudinary
    const formData = new FormData();
    formData.append("file", inputValue);
    formData.append("upload_preset", "llzecft2");
    if (token !== "undefined" && inputValue) {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/ddav2oh8j/image/upload",
        {
          method: "post",
          body: formData,
        }
      );
      const data = await response.json();

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
      setIsError(true);
    }
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <input onChange={(e) => setInputValue(e.target.files[0])} type="file" />
        <input type="submit" />
      </form>
      {isError && (
        <p className="text-red-500">You must have a token and file.</p>
      )}
      <p>{imageResponse.public_id}</p>
      <div>
        <AdvancedImage cldImg={myImage} />
      </div>
    </>
  );
};

export default Image;
