import React, {useState, useEffect } from 'react';
import './Post.css';

;


const Post = ({post}) => {
  const user_id = window.localStorage.getItem("user_id");
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState(post.likes)
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

  const deletePost = (id) => {
    const post_id = id
    console.log(post_id)
    fetch('posts/delete', {
      method: "delete",
      headers: {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      },
      body:JSON.stringify({
        _id: post_id
      })
    }).then(res=>res.json())
    .then(result=>{
      console.log(result)
    }).catch(err => {
      console.log(err)
    })

  };


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
            {likes.includes(user_id) ?
            <p><button className="unlike-button" onClick={() => unLikePost(post._id)}>Unlike | {likes.length}</button></p>
            :
            <p><button className="like-button" onClick={() => likePost(post._id)}>Like | {likes.length}</button></p>
            }
            {post.postedBy.includes(user_id) ?
            <button className="edit-button"onClick={() => {updatedMessage(post._id)}}>Edit Post</button>
            : "" }
            {post.postedBy.includes(user_id) ?
            <button className ="delete-button" onClick={() => {deletePost(post._id)}}>Delete Post</button>
            : "" }
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
