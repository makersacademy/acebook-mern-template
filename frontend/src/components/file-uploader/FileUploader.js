import React, { useRef } from 'react'

const FileUploader = ({onFileSelectSuccess, onFileSelectError, userPhoto, setUserPhoto}) => {
  const fileInput = useRef(null) // research

  const handleFileInput = (event) => {
    const file = event.target.files[0];

    if (file.size > 3072000) // size of 30MB in binary KB - this isn't actually 30MB anymore...
      onFileSelectError({ error: "File size cannot exceed 30MB" });
    else onFileSelectSuccess(file);
  }

  return (
    <div className="file-uploader">
      <input type="file" onChange={handleFileInput} />
      <button onClick={event => fileInput.current && fileInput.current.click()} className="btn btn-primary" />
    </div>
  )
}

export default FileUploader;
