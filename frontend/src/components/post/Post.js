import React, {useState, useEffect } from 'react';
import './Post.css';
import Modal from '../comment/Modal';


const Post = ({post}) => {
  const user = JSON.parse(window.localStorage.getItem("user"));
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState(post.likes)
  const [show, setShow] = useState(false);
  const [comments, setComments] = useState(post.comments)

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
      setLikes(likes.concat(user._id))
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
      unLike.splice((likes.indexOf(user._id)),1 )
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
        text: text
      })
    }).then(res=>res.json())
    .then( data => {
      let updateComments = comments.concat(data)
      setComments(updateComments)

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
    <div id="post-wrap">
      <div className="post-flex">
          <div className='content'>
            {post.message === "" ? false
            :
            <article data-cy="post" className="post-text" key={ post._id }>{ post.message }</article>
            }       
            {post.photo === "" ? false
            :
            <article><p><img src={post.photo} alt="placeholder" className="postImg"></img></p></article>
            }
            {likes.includes(user._id) ?
            <p><button className="unlike-button" onClick={() => unLikePost(post._id)}>Unlike | {likes.length}</button></p>
            :
            <p><button className="like-button" onClick={() => likePost(post._id)}>Like | {likes.length}</button></p>
            }
            {post.postedBy.includes(user._id) ?
            <button onClick={() => {updatedMessage(post._id)}}>Edit Post</button>
            : "" }
            {post.postedBy.includes(user._id) ?
            <button onClick={() => {deletePost(post._id)}}>Delete Post</button>
            : "" }
            <form onSubmit={(e) => { e.preventDefault()
              makeComment(e.target[0].value, post._id)
            }}>
              <input type="text" placeholder="Enter a comment.."/>
            </form>
              <button onClick={() => setShow(true)}>Show comments</button>
              <Modal title="Comments Tab" onClose={() => setShow(false)} show={show}>
              {
                comments.map(record => {
                  return (
                    <h6 key="comms-box"><span key="user-name" style={{fontweight: "500"}}>Username</span> : {record.text}</h6>
                  )
                })
              }
              </Modal>
          </div>
        </div>
      </div>
  )
};

export default Post;
