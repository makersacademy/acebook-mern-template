import React, { createContext } from "react";
import { Cloudinary } from "@cloudinary/url-gen";

export const CloudinaryContext = createContext(null);

// Create a Cloudinary instance and set your cloud name.
export const cld = new Cloudinary({
  cloud: {
    cloudName: "ddav2oh8j",
  },
});

const CloudinaryContextProvider = ({ children }) => {
  <CloudinaryContext.Provider value={cld}>
    {children}
  </CloudinaryContext.Provider>;
};

export default CloudinaryContextProvider;
