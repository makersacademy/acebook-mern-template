import React, { useState } from 'react';

const CreateCommentForm = ({callback}) => {
    const [textArea, setTextArea] = useState("");

    const handleTextAreaChange = (event) => {
        setTextArea(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (textArea !== '') {
            let response = await fetch(window.location.pathname, {
                method: 'post',
                headers: {
                    'Authorization': "Bearer " + window.localStorage.getItem('token'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id: window.localStorage.getItem('user_id'), message: textArea})
            })

            const data = await response.json()

            if(response.status !== 201) {
                console.log(data.error)
            } else {
                console.log("comment created");
                setTextArea('');
                callback(true);
            }
        }
    }

    return (
        <div>
            <form className='create-post-form'>
                <input type='text' value= {textArea} onChange= {handleTextAreaChange}></input>
                <button type='submit' onClick={handleSubmit}>Create comment</button>
            </form>
        </div>
    )
}

export default CreateCommentForm;