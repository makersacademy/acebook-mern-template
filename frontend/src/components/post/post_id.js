
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

// component for displaying post

// const Feed = ({ navigate }) => {
//     const [posts, setPosts] = useState([]);
//     const [token, setToken] = useState(window.localStorage.getItem("token"));
// const [editPostForm, ]

const PostId = () => {
    const [post, setPost] = useState([]);
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const { id } = useParams();



    useEffect(() => {
        // if (token) {
            fetch(`/posts/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(async data => {
                    window.localStorage.setItem("token", data.token)
                    setToken(window.localStorage.getItem("token"))
                    setPost(data);
                })
        // }
    }, [id, token]);


    // if(token) {
        return(
          <>
            <div >
                <p data-cy='post'>{post.message}</p>
                
            </div>
          </>
        )
    // }
    // component for editing post
    // <div>
    //         <p data-cy="username">Username: {userInfo.username}</p>
    //         <p data-cy="email">Email: {userInfo.email}</p>
    //     </div>

    // const editPostForm 
}

export default PostId;