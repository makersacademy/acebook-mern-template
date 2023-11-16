import React, { useState } from 'react';
import './NewPost.css';
import NavBar from '../navBar/NavBar';


const NewPost = ({ user_id }) => {
    const [message, setMessage] = useState("");
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    // const [image, setImage] = useState("");

    const handleSubmit = async (event) => { //event holds the info of post from form
        event.preventDefault(); // prevent default stops the page from reloading


    //POST REQUEST TO CREATE NEW USER
    fetch('/posts', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({message, user_id}),//TODO image
    })
    .then(response => response.json())
    .then(response => {
        if(response.status === 201) {
          // GOOD NEWS.
            console.log({message})
        } else {
        // BAD NEWS.
            console.log('Message not captured')
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
        <NavBar />
            <div className="new_post">
                <form onSubmit={handleSubmit}>
                <textarea placeholder="write your post"
                className="new-post-message" 
                rows="4" cols="50"
                value={message} 
                onChange={handleMessageChange}
                />
                <br />
                <input type="file" name="post_image"></input>
                <input id='submit' type="submit" value="Post" className='custom-btn'/>
                </form>
            </div>
        </>
        

    );
};



export default NewPost;








// May need to be added to /api/controllers/users OR /new_user
// // Added to get user info on profile page 
//   getUser: async (req, res) => {
//     try {
//       const userId = req.userId; 
//       const user = await User.findById(userId);
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }

//       res.status(200).json({ user });
//     } catch (error) {
//       console.error('Error fetching user:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   }















//NOTES
// add text and image to db
// view that text and image in post component
// data organised in database as
    //  _id ,  .message, image (image has not yet been added to <Post />)



// import axios from 'axios';

// const addPost = () => {
//     axios.get('api/posst')
//     .then( response =>{
//         console.log(response.data)
//     }).catch(() =>{
//         console.log('crap')
//     })
// }



// html for img 
// const NewPost = (posts) => {
//     return(
//         <div class="new_post">
//             <p>Text here</p>
//             <form htmlFor="postText">
//                 <textarea placeholder="write a post" class="new-post-button" id="postText" rows="4" cols="50"></textarea>
//                 <button class="custom-btn" type="button">Add Picture</button>
//                 <input type="file" name="post_image"></input>
//                 <br></br>
//                 <button class="custom-btn" type="submit">Submit</button>
//             </form>
//             <p>{posts.post_text}</p> 
// {/* 
//             <p>{posts.post_text}</p> 
//             <img src={posts.post_img} alt={posts.post_alt} width="300">
//             </img> */}
//         </div>

//     )
// }