import React, { useRef } from 'react'

const FileUploader = ({onFileSelectSuccess, onFileSelectError}) => {
  const fileInput = useRef(null)

  const handleFileInput = (event) => {
    const file = event.target.files[0]
    if (file.size > 30720) // size of 30MB in binary KB
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
