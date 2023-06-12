import { useEffect, useState } from "react"
import { useParams } from "react-router";

const UpdatePost = ({ navigate }) => {
  const [placeholderContent, setplaceholderContent] = useState([]);
  const [message, setMessage] = useState("");
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
          setplaceholderContent(data.post.message)
        })
    }
  }, [])
    
  const handleSubmit = async (event) => {
    event.preventDefault();
    // below: this is the method that handles the post request
      await fetch('/posts/' + post_id.id + "/update", {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({
        message: message
      })
    })
    // navigate('/posts/' + post_id.id + "/update")
    navigate('/posts');
  }

  const handleMessageChange = (event) => {
    setMessage(event.target.value);    
  }
  
  return(
    <>
      <h2>Update post: {`${post_id.id}`}</h2>
      <p>{placeholderContent}</p>
      <form onSubmit={handleSubmit}>
      <input placeholder={placeholderContent} id="message" type="text" value={message} onChange={handleMessageChange} />
      <input role='submit-button' id='submit' type="submit" value="Post!" />
    </form>
    </>
  )
}

export default UpdatePost;
