import { useEffect, useState } from "react";
import { useParams } from "react-router";


const ViewPost = ({ navigate }) => {
  const [post, setPost] = useState("test message");
  const { id } = useParams(); // this extracts the post id from the URL params
  const [token] = useState(window.localStorage.getItem("token")); // Get the token from local storage

  useEffect(() => {
  const fetchPost = async () => {
  console.log("Fetching post with id:", id);
  if (token) {
    const response = await fetch(`/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Fetched post data:", data);
      setPost(data.post);
    } else {
      console.error("Error fetching post:", response.status);
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
