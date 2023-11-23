import React, { useState } from 'react';
import './NewPost.css';


const NewPost = () => {
    const [message, setMessage] = useState("");
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    //ADDED
    const [image, setImage] = useState(null); 
    const [characterCount, setCharacterCount] = useState(0);

    const handleSubmit = async (event) => { 
        event.preventDefault(); // prevent default stops the page from reloading
        setMessage(""); //clears message once sent
        setImage(null) 


    // Send data to the backend
            fetch('/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ message, image})
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
        const inputValue = event.target.value;
        setMessage(inputValue);
        setCharacterCount(inputValue.length); //character count

    };

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleReset = () => { 
        window.location.reload(); //reset page 
        };


    return(
        <>
            <div className="new_post">
                
            {/* IMAGE PREVIEW */}
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
            {/* IMAGE PREVIEW */}

                <form className='newpostform' onSubmit={handleSubmit} enctype="multipart/form-data">
                    <textarea 
                    placeholder="Enter new post here..."
                    className="new-post-message"
                    maxlength="250" //MAX post length 
                    rows="4" cols="52"
                    value={message} 
                    onChange={handleMessageChange}
                    />
                <div id="the-count">
                    <span id="current">{characterCount}</span>
                    <span id="maximum">/ 250</span>
                </div>

                {/* IMAGE UPLOAD */}
                <div className="file-input">
                    <input type="file" 
                        id="postImage" 
                        name="post-image"
                        onChange={handleImageChange} />
                </div>
                {/* IMAGE UPLOAD */}
                    <button className="newpostbutton" onClick={() => setImage(null)}>Clear all</button>
                    <input id='submit' 
                            type="submit" 
                            value="Post" 
                            className="newpostbutton" 
                            onClick={handleReset}/>
                </form>
            </div>
        </>
        

    );
};


export default NewPost;








































                               ///WORKING POST MESSAGE ONLY ///
//         fetch('/posts', {
//             method: 'post',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             },
//             body: JSON.stringify({message, image, user_id}),
//         })
//         .then(response => {
//             if(response.status === 201) {
//                 console.log({message})
//             } else {
//                 console.log("message not captured");
//                 console.log(JSON.stringify(response))
//             }
//             })
// };

                              ///WORKING POST MESSAGE ONLY ///