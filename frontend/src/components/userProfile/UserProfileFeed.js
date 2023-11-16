import React, { useEffect, useState } from 'react';
import Post from '../post/Post'

const UserProfileFeed = ({ navigate }) => {
	const [posts, setPosts] = useState([]);
	const [token, setToken] = useState(window.localStorage.getItem("token"));
  

    useEffect(() => {
      if(token) {
        fetch("/users/profile/:user_id", {
					// fetch("/posts", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => response.json())
          .then(async data => {
            window.localStorage.setItem("token", data.token)
            setToken(window.localStorage.getItem("token"))
            setPosts(data.posts);
          })
      }
    }, [])

  // const logout = () => {
  //   window.localStorage.removeItem("token")
  //   navigate('/login')
  // }
    
    if(token) {
      return(
				<>
					<h2>USER PROFILE PAGE</h2>
					<div id='user-profile-feed' role="feed">
							{posts.map(
								(post) => ( <Post post={ post } key={ post._id } /> )
							)}
					</div>
				</>
			)
		} else {
			navigate('/login')
		}
	}
  export default UserProfileFeed;
  