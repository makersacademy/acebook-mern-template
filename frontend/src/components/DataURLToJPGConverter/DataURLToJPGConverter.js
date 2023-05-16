import React from 'react';
const Buffer = require("buffer").Buffer;


const DataURLToJPGConverter = ({ dataURL }) => {
  const convertDataURLToJPG = () => {
    const base64Data = dataURL.split(",")[1]; // remove prefix from data to leave just the base64
    const byteCharacters = Buffer.from(base64Data, 'base64'); // decodes the base64 data and encodes as a binary string
    const byteArrays = new Uint8Array(byteCharacters); // will represent the raw binary data of the image

    const blob = new Blob(byteArrays, { type: "image/jpeg" }) // Uint8Array is a special type of array for handling binary data, this creates a new Blob object with that data and specifies that it's a jpeg

    const imageURL = URL.createObjectURL(blob);
    console.log(imageURL.slice(5));

    return imageURL.slice(5);
  };

  const imageURL = convertDataURLToJPG();
  return <img src={imageURL} alt="dog" />;
}

export default DataURLToJPGConverter;
