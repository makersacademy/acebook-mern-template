import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Post from '../post/Post'

const UserProfileFeed = ({ navigate }) => {
	const [posts, setPosts] = useState([]);
	const [token, setToken] = useState(window.localStorage.getItem("token"));
  const user_id = useParams();

  // authentication
  useEffect(() => {
      if(token) {
        fetch(`/users/profile/${user_id.user_id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(response => response.json())
          .then(async data => {
            window.localStorage.setItem("token", data.token)
            setToken(window.localStorage.getItem("token"))
            setPosts(data.posts);
          })
          .catch(error => console.error('Error fetching user profile:', error))
      }
    }, [])

    
  // Users posts: filter list of posts on the basis of user_id

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
  