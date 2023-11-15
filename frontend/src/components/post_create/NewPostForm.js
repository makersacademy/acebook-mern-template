import React, { useState } from 'react';
import styles from './newPostForm.module.css'

// New Post Form:

const NewPostForm = ({navigate}) => {
    
    // =========== STATE VARIABLES ==========================
    const [message, setMessage] = useState("");
    const [token, setToken] = useState(window.localStorage.getItem("token"));



    // ============ FORM SUBMISSION FOR NEW POST ==================
    const handleSubmit = async (event) => {

        if(token){ // if user is logged in

            event.preventDefault(); 
            console.log(token);
            // Send POST request to '/posts' endpoint
            fetch( '/posts', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // necessary for requests that need login auth
                },
                body: JSON.stringify({ 
                    message: message
                 }) // <===== BODY OF REQUEST: message
                })
                .then(response => {
                    if(response.status === 201) {
                    console.log('successful') 
                    navigate('/posts') // If successful, navigate to posts page
                    return response.json()
                    } else {
                    console.log('not successful')
                    navigate('/signup') // If unsuccessful, stay on the signup page
                    }
                })
                .then(async data => {
                    // Updates to a new token when the GET request is complete
                    window.localStorage.setItem("token", data.token)
                    setToken(window.localStorage.getItem("token"))
                    console.log(token)
                })
            }
        }

    // ------------ SUPPORTIVE FUNCTIONS: ----------------
    // FUNCTIONS FOR CHANGING STATE VARIABLES 
    const handleMessageChange = (event) => {
        setMessage(event.target.value)
    }


    // ========= JSX FOR THE UI OF THE COMPONENT =====================
    // one input field and a submit button

    return (
        <form onSubmit={handleSubmit} className={styles.Middle}>

          <textarea id="message" value={message} onChange={handleMessageChange} className={styles.textarea} placeholder="Share your Thoughts on acebook..."/>
          <br/>
          <input id="submit" type="submit" value="Submit" className={styles.Button}/>
      </form>
         
    )

}

export default NewPostForm;