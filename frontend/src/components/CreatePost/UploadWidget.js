import "./CreatePost.css";
import { useEffect, useRef} from 'react'

const UploadWidget = ({handleImageUpload, buttonText} ) => {

  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary
    // Create an upload widget
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: "dtdnuazpk",
      uploadPreset: "ml_default"
    }, function(error, result) {
      if (!error && result && result.event === "success")  {
        handleImageUpload(result);
      }  
    })
  }, [])

  return (
    <button className="upload-image" onClick={() => widgetRef.current.open()}>
      {buttonText}
    </button>
  )
}
 
export default UploadWidget;