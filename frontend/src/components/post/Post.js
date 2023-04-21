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

    <body>

    <div id="homePage">
      <div class="postWrap">
        <div class="textWrap">
        <article data-cy="post" key={ post._id }>{ post.message }
        {post.likes.includes(user_id)
        ?   
        <button class="like-button" onClick={() => unLikePost(post._id)}>Unlike</button>
        :
        <button class="like-button" onClick={() => likePost(post._id)}>Like</button>
        }
            <p>Likes: {post.likes.length}</p>
        </article>
        <div id="example">    
      </div>
        </div>
      </div>
    </div>
  </body>

    
  )
};

export default Post;



// 