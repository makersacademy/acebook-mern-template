import React, { useState } from 'react';
import './NewPost.css';


const NewPost = ({ user_id }) => {
    const [message, setMessage] = useState("");
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    // TODO  const [image, setImage] = useState("");

    const handleSubmit = async (event) => { 
        event.preventDefault(); // prevent default stops the page from reloading
        setMessage(""); //clears message once sent

    fetch('/posts', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({message, user_id}),//TODO image
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

    };

    // const handleImageChange = (event) => {
    //     setImage(event.target.value);
    // };

    return(
        <>
            <div className="new_post">
                <form onSubmit={handleSubmit}>
                <textarea placeholder="write your post"
                className="new-post-message" 
                rows="4" cols="50"
                value={message} 
                onChange={handleMessageChange}
                />
                <br />
                <input type="url" id="post-image" name="post-image" placeholder="add image" />
                <br />
                <input id='submit' type="submit" value="Post" className='custom-btn'/>
                </form>
            </div>
        </>
        

    );
};


export default NewPost;