import React, { useState } from 'react';

const NewPostForm = ({ navigate }) => {
    
    const [message, setMessage] = useState("");
    const [token, setToken] = useState(window.localStorage.getItem("token"));

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(token) {
            fetch( '/posts', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ message: message })
        })
            .then(response => {
                if(response.status === 201) {
                    navigate('/posts')
                } else {
                    navigate('/login') //if the token expires while on the page, the post will not be created
                }
            })
            .then(async data => {
                // window.localStorage.setItem("token", data.token)
                // setToken(window.localStorage.getItem("token")) //returns a new token
            })
        }
    }

    const handleMessageChange = (event) => {
        setMessage(event.target.value)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="What's on your mind?" id="message" type='text' value={ message } onChange={handleMessageChange} />
            <input id='submit' type="submit" value="Create New Post" />
        </form>
    );
}

export default NewPostForm;