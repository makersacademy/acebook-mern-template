import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

const ViewPost = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams(); // this extracts the post id from the URL params
  const navigate = useNavigate();
  const [token, setToken] = useState(window.localStorage.getItem("token")); // Get the token from local storage

  useEffect(() => {
    const fetchPost = async () => {
      if (token) {
        const response = await fetch(`/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPost(data.post); // Set the fetched post data to the state
        } else {
          console.error("Error fetching post:", response.status); // Log an error if the response status is not OK
        }
      }
    };

    fetchPost(); // this calls the fetchPost function when the id or token changes
  }, [id, token]);

  const handleViewPost = () => {
    navigate(`/posts/${id}`); // Navigate to the detailed view of the post
  };

  return (
    <div>
      {post && (
        <>
          <h2>View Post: {id}</h2>
          <p>Message: {post.message}</p>
        </>
      )}
      <button onClick={handleViewPost}>View Post</button>
    </div>
  );
};

export default ViewPost;
