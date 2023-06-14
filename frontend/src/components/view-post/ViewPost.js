import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from 'react-router-dom';


const ViewPost = ({ navigate }) => {
  const [post, setPost] = useState("test message");
  const { id } = useParams(); // this extracts the post id from the URL params
  const [token, setToken] = useState(window.localStorage.getItem("token")); // Get the token from local storage

  useEffect(() => {
    if(token) {
      fetch("/posts/" + id , {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))
          setPost(data.post)
        })
    }
  }, [])

  const updateLink = `/posts/${post._id}/update`;
  const deleteLink = `/posts/${post._id}/delete`;

  // useEffect(() => {
  // const fetchPost = async () => {
  // console.log("Fetching post with id:", id);
  // if (token) {
  //   const response = await fetch(`/posts/${id}`, {
  //     headers: {
  //       'Authorization': `Bearer ${token}`,
  //     },
  //   });

  //   if (response.ok) {
  //     const data = await response.json();
  //     console.log("Fetched post data:", data);
  //     setPost(data.post);
  //   } else {
  //     console.error("Error fetching post:", response.status);
  //   }
  // }
  //   };

  //   fetchPost(); // this calls the fetchPost function when the id or token changes
  // }, [id, token]);

  // const handleViewPost = () => {
  //   navigate(`/posts/${id}`); // Navigate to the detailed view of the post
  // };

  return (
    <div>
        <>
          <h2>View Post: {post._id}</h2>
          <p>Author: {post.author}</p>
          <p>Message: {post.message}</p>
          <div>
            <Link to={updateLink} id="update-link">Update post</Link>
            <Link to={deleteLink} id="delete-link">Delete post</Link>
          </div>
        </>
    </div>
  );
};

export default ViewPost;
