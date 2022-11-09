// // import './App.css';

// import { useState, useEffect } from "react";
// import {
//   ref,
//   uploadBytes,
//   getDownloadURL,
//   listAll
// } from "firebase/storage";
// import { storage } from "./firebase";
// import { v4 } from "uuid";

// export default function PostForm (props) {
//   // Component state
//   const [message, setMessage] = useState('')
//   // Feed already resets the token for us.
//   const token = window.localStorage.getItem("token");

// // Image upload starts here
//     const [imageUpload, setImageUpload] = useState(null);
//     const [imageUrls, setImageUrls] = useState([]);
  
//     const imagesListRef = ref(storage, "images/");
//     const uploadFile = () => {
//       if (imageUpload == null) return;
//       const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
//       uploadBytes(imageRef, imageUpload).then((snapshot) => {
//         getDownloadURL(snapshot.ref).then((url) => {
//           setImageUrls((prev) => [...prev, url]);
//         });
//       });
//     };
  
//     useEffect(() => {
//       listAll(imagesListRef).then((response) => {
//         response.items.forEach((item) => {
//           getDownloadURL(item).then((url) => {
//             setImageUrls((prev) => [...prev, url]);
//           });
//         });
//       });
//     }, []);

//   const handleSubmit = async (error) => {
//     error.preventDefault() // Prevents default action of refreshing the page

//     const response = await fetch('/posts/', {
//       method: 'post',
//       body: JSON.stringify({message}),
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + token
//       }
//     })
//     const json = await response.json()
//     if (!response.ok) {
//       console.log('Message couldnt send', json)
//     }
//     if (response.ok) {
//       // If form sent successfully then it resets the input field.
//       setMessage('')
//       props.reload()
//     }
//   }

//   // Actual JSX
//   return (
//     <div className="form-container">
//       <form className='create-message-form' onSubmit={handleSubmit}>
//         <label htmlFor="text-box">New Message</label>
//         <input
//           type="text"
//           className="text-box"
//           // Maybe add setImageUpload here?
//           onChange={(e) => setMessage(e.target.value)
//           // .then((event) => {
//           //   setImageUpload(event.target.files[0]);
//           // } )
//           }
//           placeholder="What's on your mind?"
//           value={message}
//           required
//           />
//         {/* <button
//           className='signup-form-btn'
//           >Add Post</button>  */}
//           {/* Image app starts here */}
//       {/* <div className="imageApp"> */}
//        <input
//           type="file"
//           onChange={(event) => {
//             setImageUpload(event.target.files[0]);
//           }}
//         multiple />
//       <button id="upload-post-img-btn" onClick={uploadFile}>Add Post</button>
//         {imageUrls.map((url) => {
//         return <img className="uploaded-img" src={url} />;
//       })}
//       {/* </div>     */}
//       </form>
//     </div>
//   )
// }
