import React, { useState } from 'react';
import './NewPost.css';


const NewPost = ({ user_id }) => {
    const [message, setMessage] = useState("");
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [image, setImage] = useState(null); 
    const [characterCount, setCharacterCount] = useState(0);

    const handleSubmit = async (event) => { 
        event.preventDefault(); 
        setMessage(""); 
        setImage(null) 
    
    const formData = new FormData();
    formData.append('message', message);
    formData.append('image', image);

    console.log(`Bearer ${token}`);

        const response = await fetch('/posts', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
            });

            if (response.status === 201) {
            const responseData = await response.json(); 
            console.log(responseData);
            } else {
            console.log("Message not captured");
            console.log(JSON.stringify(response));
                }
    };

    const handleMessageChange = (event) => {
        const inputValue = event.target.value;
        setMessage(inputValue);
        setCharacterCount(inputValue.length); 

    };

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleReset = () => { 
        window.location.reload(); 
        };


    return(
        <>
        <h2>Compose</h2>
            <div className="new_post">
                {image && (
                    <div class="image-preview">
                    <img
                        alt="not found"
                        width={"450px"}
                        height={"300px"}
                        src={URL.createObjectURL(image)}
                    />
                    </div>
                )}

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <textarea 
                    placeholder="write your post"
                    className="new-post-message"
                    maxLength="250" //MAX post length 
                    rows="4" cols="52"
                    value={message} 
                    onChange={handleMessageChange}
                    />
                <br />
                <div id="the-count">
                    <span id="current">{characterCount}</span>
                    <span id="maximum">/ 250</span>
                </div>

                {/* IMAGE UPLOAD */}
                <input type="file" 
                        id="postImage" 
                        onChange={handleImageChange} />
                {/* IMAGE UPLOAD */}
                <br />
                    <button onClick={() => setImage(null)}>Clear all</button>
                <br />
                    <input id='submit' 
                            type="submit" 
                            value="Post" 
                            className='custom-btn' 
                            onClick={handleReset}
                            />
                </form>
            </div>
        </>
        

    );
};


export default NewPost;
