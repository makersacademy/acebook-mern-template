import { useEffect, useState } from "react"
import { useParams } from "react-router";

const UpdatePost = ({ navigate }) => {
  const [postContent, setPostContent] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const post_id = useParams();
  // console.log(post_id.id);
  
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
    
  const handleSubmit = () => {

  }

  const handleMessageChange = () => {

  }
  
  return(
    <>
      <h2>Update post: {`${post_id.id}`}</h2>
      <p>{postContent}</p>
      <form onSubmit={handleSubmit}>
      <input placeholder={postContent} id="message" type="text" onChange={handleMessageChange} />
      <input role='submit-button' id='submit' type="submit" value="Post!" />
    </form>
    </>
  )
}

export default UpdatePost;
