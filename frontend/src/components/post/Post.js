import React, {useState, useEffect } from 'react';
import './Post.css';

const Post = ({post}) => {
  const user_id = window.localStorage.getItem("user_id");
    useEffect(() => {
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
    // eslint-disable-next-line
  }, [])
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  // eslint-disable-next-line
  const [posts, setPosts] = useState([]);

  useEffect(() => {
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
    // eslint-disable-next-line
  }, [])


  const likePost = (id) => {
    fetch('posts/like',{
      method:"put",
      headers: {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      },
      body:JSON.stringify({
        _id:id
      })
    }).then(res => res.json())
    .then(result => {
      console.log(result)
    })
  };

  const unLikePost = (id) => {
    fetch('posts/unlike',{
      method:"put",
      headers: {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      },
      body:JSON.stringify({
        _id:id
      })
    }).then(res => res.json())
    .then(result => {
      console.log(result)
    })
  }
// 
  return(

    <div id="homePage">
      <div className="flexbox">
        <div className="item">
          <div className='content'>
        {post.message === ""
        ?
        false
        :
        <article data-cy="post" className="postMsg" key={ post._id }>{ post.message }</article>
        }       
        {post.photo === ""
        ?
        false
        :
        <article><p><img src={post.photo} alt="placeholder" className="postImg"></img></p></article>
        }
        
        {post.likes.includes(user_id)
        ?   
        <p><button className="unlike-button" onClick={() => unLikePost(post._id)}>Unlike | {post.likes.length}</button></p>
        :
        <p><button className="like-button" onClick={() => likePost(post._id)}>Like | {post.likes.length}</button></p>
        }
        
        </div>
        </div>
      </div>
    </div>

    
  )
};

export default Post;



// 