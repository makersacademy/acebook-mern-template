/* eslint-disable react/destructuring-assignment */
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { AdvancedImage } from "@cloudinary/react";
import { CloudinaryContext } from "../../contexts/cloudinaryContext";

const ProfilePicture = ({ className, publicId }) => {
  const cld = useContext(CloudinaryContext);

  const myImage = cld.image(publicId);

  return (
    <div
      className={`${className} relative overflow-hidden rounded-full bg-gray-100`}
    >
      {publicId ? (
        <AdvancedImage cldImg={myImage} />
      ) : (
        <svg
          className="absolute left-[-10%] h-[120%] w-[120%] text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </div>
  );
};

ProfilePicture.propTypes = {
  className: PropTypes.string,
  publicId: PropTypes.string,
};

ProfilePicture.defaultProps = {
  className: "h-10 w-10",
  publicId: "",
};

export default ProfilePicture;
