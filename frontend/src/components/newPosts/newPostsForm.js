// import React, { useState } from 'react';

// const newPostsForm = ({ navigate }) => {

//   const [message, setMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     fetch( '/posts', {
//       method: 'post',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ message: message })
//     })
//       .then(response => {
//         if(response.status === 201) {
//           navigate('/posts')
//         } else {
//           setErrorMessage('Invalid message!');
//           navigate('/posts')
//         }
//       })
//   }


//   const handleMessageChange = (event) => {
//     setMessage(event.target.value)
//   }


//     return (
//       <form onSubmit={handleSubmit}>
//           <input placeholder="Message" id="message" type='text' value={ message } onChange={handleMessageChange} />
//         <input id='submit' type="submit" value="Submit" />
//         {errorMessage && (
//   <p className="error"> {errorMessage} </p>
// )}
      
//       </form>
//     );
// }

// export default newPostsForm;
