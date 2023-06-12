// made seperate fetchers folder for code re-use
import jwt_decode from 'jwt-decode';

export const handleSendingNewPost = async (token, message, url) => {
    // try catch are essential for async fucntions for cathing errors
    try {
      console.log(jwt_decode(token));
      const response = await fetch(`${url}`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: message })
      });
      const data = await response.json();
      console.log(data)
    } catch(e) {
      console.log(e)
    }
}

export const fetchPosts = (token, setToken, setPosts) => {
    if(token) {
      fetch("/posts", {
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
}