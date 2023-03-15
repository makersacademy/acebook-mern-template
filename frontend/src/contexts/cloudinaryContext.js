import React, { createContext } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import PropTypes from "prop-types";

export const CloudinaryContext = createContext(null);

// Create a Cloudinary instance and set your cloud name.
export const cld = new Cloudinary({
  cloud: {
    cloudName: "ddav2oh8j",
  },
});

const CloudinaryContextProvider = ({ children }) => {
  return (
    <CloudinaryContext.Provider value={cld}>
      {children}
    </CloudinaryContext.Provider>
  );
};

CloudinaryContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default CloudinaryContextProvider;
