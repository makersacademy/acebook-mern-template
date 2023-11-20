import React, { useState } from 'react';
import './NewPost.css';


const NewPost = ({ user_id }) => {
    const [message, setMessage] = useState("");
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    //ADDED
    const [selectedImage, setSelectedImage] = useState(null); 
    const [characterCount, setCharacterCount] = useState(0);

    const handleSubmit = async (event) => { 
        event.preventDefault(); // prevent default stops the page from reloading
        setMessage(""); //clears message once sent
        setSelectedImage(null) 


    fetch('/posts', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({message, user_id}),
    })
    .then(response => {
        if(response.status === 201) {
            console.log({message})
        } else {
            console.log("message not captured");
            console.log(JSON.stringify(response))
        }
        })
};

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
        const inputValue = event.target.value;
        setCharacterCount(inputValue.length); //character count

    };

    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const handleReset = () => { 
        window.location.reload(); //reset page 
        };


    return(
        <>
            <div className="new_post">
                
            {/* IMAGE PREVIEW */}
                {selectedImage && (
                    <div class="image-preview">
                    <img
                        alt="not found"
                        width={"250px"}
                        src={URL.createObjectURL(selectedImage)}
                    />
                    <br />
                    <button onClick={() => setSelectedImage(null)}>Remove</button>
                    </div>
                )}
            {/* IMAGE PREVIEW */}

                <form onSubmit={handleSubmit}>
                    <textarea 
                    placeholder="write your post"
                    className="new-post-message"
                    maxlength="300"
                    rows="4" cols="50"
                    value={message} 
                    onChange={handleMessageChange}
                    />
                <br />
                <div id="the-count">
                    <span id="current">{characterCount}</span>
                    <span id="maximum">/ 300</span>
                </div>

                {/* IMAGE UPLOAD */}
                <input type="file" 
                        id="postImage" 
                        name="post-image" 
                        onChange={handleImageChange}/>
                {/* IMAGE UPLOAD */}
                <br />
                    <input id='submit' type="submit" value="Post" className='custom-btn' onClick={handleReset}/>
                </form>
            </div>
        </>
        

    );
};


export default NewPost;

