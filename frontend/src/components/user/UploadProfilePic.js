import React, { useState } from 'react';

const Upload = ({ navigate }) => {
    const [fileInputState, setFileInputState] = useState('');
    const [selectedFile, setSelectedFile] = useState('');
    const [previewSource, setPreviewSource] = useState('')
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
    };


    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
    }

    return (
    <div>
        <h1>Upload</h1>
        <form>
            <input 
            type="file" 
            name="image" 
            className="form-input" 
            value={fileInputState} 
            onChange={handleFileInputChange}/>
            <button className="btn" type="button">Submit</button>
        </form>

        {previewSource && (
            <img src={previewSource} alt="alt"/>
        )}
    </div>
  );
}

export default Upload;