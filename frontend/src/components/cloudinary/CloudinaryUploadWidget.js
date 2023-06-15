// This is a multipurpose template. 
// No integration solutions are fully tested.
// To use this file, create a copy, rename it,
// and build from there.

// If you are using this as a child component to a POST form,
// you will need to pass `imageUrl` up to the parent
// via a `useState` callback passed in by parent
// and used on line 6.

const CloudinaryUploadWidget = () => {

  // Depending on your use case, you may need to wrap this in a useEffect?
  // In which case, the nature of the return may need to change.
  // When we had this on /signup without a useEffect, 
  // clicking the widget button sent the parent form data if
  // it was valid (so a user was created as if they had clicked 'Sign Up'.

  // Cloudinary says:
  // Remove the comments from the code below to add
  // additional functionality.
  // Note that these are only a few examples, to see
  // the full list of possible parameters that you
  // can add see:
  //   https://cloudinary.com/documentation/upload_widget_reference

  const openWidget = () => { window.cloudinary.createUploadWidget(
    {
      cloudName: "acebook",
      uploadPreset: "acebook_unsigned_preset",
      cropping: true, //add a cropping step
      multiple: false,  //restrict upload to a single file
      // showAdvancedOptions: true,  //add advanced options (public_id and tag)
      // sources: [ "local", "url"], // restrict the upload sources to URL and local files
      // folder: "user_images", //upload files to the specified folder
      // tags: ["users", "profile"], //add the given tags to the uploaded files
      // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
      // clientAllowedFormats: ["images"], //restrict uploading to image files only
      // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
      // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
      // theme: "purple", //change to a purple theme
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log("Done! Here is the image info: ", result.info);
        // To capture the url from the result:
        // const imageUrl = result.info.secure_url;

        // add backend fetch here, for example
        // If you were to modify the user:avatar, you could do:

        // fetch('/users', {
        //   method: 'patch',
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({ imageURL: imageUrl }),
        // })
      }
    }).open();
  };

  return (
    <div>
      <button onClick={openWidget}>Choose an image to upload as your avatar</button>
    </div>
  );
}

export default CloudinaryUploadWidget;
