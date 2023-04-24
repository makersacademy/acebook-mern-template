import React, {useState, useEffect } from 'react';
import './Post.css';

;


const Post = ({post}) => {
  const user_id = window.localStorage.getItem("user_id");
  const [token, setToken] = useState(window.localStorage.getItem("token"));
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

  const updatedMessage = async (id) => {
    
    const newMessage = prompt("Enter your NEW message:")
    console.log(user_id)
    console.log(id)
    if (user_id === id){
  
    await fetch( '/posts/update', {
          method: "put",
          headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ _id: id, message: newMessage })
      })
      .then(response => {
        response.json()
        if(response.status === 201) {
        } 
      })
    }
    else{ console.log("Not your post")}
  };

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
      setLikes(likes.concat(user_id))
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
      let unLike = likes.slice()
      unLike.splice((likes.indexOf(user_id)),1 )
      setLikes(unLike)
      console.log("this is ", likes)
    })
  };

  const makeComment = (text,postId) => {
    fetch('posts/comment', {
      method: "put",
      headers: {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      },
      body:JSON.stringify({
        _id: postId,
        text
      })
    }).then(res=>res.json())
    .then(result=>{
      console.log(result)
    }).catch(err => {
      console.log(err)
    })
  }


  return(
    <div id="homePage">
      <div className="flexbox">
        <div className="item">
          <div className='content'>
            {post.message === "" ? false
            :
            <article data-cy="post" className="postMsg" key={ post._id }>{ post.message }</article>
            }       
            {post.photo === "" ? false
            :
            <article><p><img src={post.photo} alt="placeholder" className="postImg"></img></p></article>
            }
            {post.likes.includes(user_id) ?
            <p><button className="unlike-button" onClick={() => unLikePost(post._id)}>Unlike | {post.likes.length}</button></p>
            :
            <p><button className="like-button" onClick={() => likePost(post._id)}>Like | {post.likes.length}</button></p>
            }
            <button onClick={() => {updatedMessage(post._id)}}>Edit Post</button>
            <form onSubmit={(e) => {
              e.preventDefault()
              makeComment(e.target[0].value, post._id)
            }}>
              <input type="text" placeholder="Leave a comment..."/>
            </form>
          </div>
        </div>
      </div>
    </div> 

  )
};

export default Post;



// 
