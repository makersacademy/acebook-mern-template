
import { useEffect, useState } from "react"
import { useParams } from "react-router";

const DeletePost = ({ navigate }) => {
  const [postContent, setPostContent] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const post_id = useParams();
  
  useEffect(() => {
    if(token) {
      fetch("/posts/" + post_id.id , {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))
          setPostContent(data.post.message)
        })
    }
  }, [])
    
  const handleDelete = async (event) => {
    event.preventDefault();
    await fetch('/posts/' + post_id.id + "/delete", {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
    })
    navigate('/posts');
  }
  
  return(
    <>
      <h2>Delete post: {`${post_id.id}`}</h2>
      <p>{postContent}</p>
      <form onSubmit={handleDelete}>
      <input role='submit-button' id='submit' type="submit" value="Delete" />
      </form>
    </>
  )
}

export default DeletePost;