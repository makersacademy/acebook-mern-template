import { useState } from "react";

const useUpload = () => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  // uploads the image to Cloudinary
  const upload = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "llzecft2");

    if (token !== "undefined" && image) {
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
      return imageData.public_id;
    }
    return null;
  };
  return upload;
};

export default useUpload;
