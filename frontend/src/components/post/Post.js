import React, {useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import AddComment from '../addComment/AddComment'
import './Post.css';
import useLikes from './useLikes'

const Post = ({post, setUpdated}) => {
  const [userName, setUserName] = useState(null);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  //const [error, setError] = useState(null);
  const [body, setBody] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [addCommentForm, setAddCommentForm] = useState(false)


  const hasBeenLiked = () => {
    return post.likes.includes(window.localStorage.getItem('user_id'))
  }

  const handleLikes = (event) => {
    event.preventDefault()
    if (token) {
      fetch(`http://localhost:3000/posts/${post._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          field: 'likes',
          value: window.localStorage.getItem('user_id'),
        }),
      }).then((response) => {
        setUpdated(true)
      })
    }
  }

  useEffect(() => {
    if (token) {
      fetch(`/users/${post.author}`)

        .then(response => response.json())
        .then(async data => {
          //window.localStorage.setItem("token", data.token)
          //setToken(window.localStorage.getItem("token"))
          setUserName(data.user.name);

        })
    }
  }, [])

 


  const handleSubmit = (event) => { 
    event.preventDefault();
    if(token) {
      fetch( `/posts/${post._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          
        },
        body: JSON.stringify({
          'field': 'comments',
          'value': {
            'user_id': window.localStorage.getItem('user_id'),
            'message': `${body}`,
            'createdAt': `${new Date()}`
          }
        })
      }).then(() => {
        setUpdated(true)
        setBody('')       
      })
      }
  }

  const firstComment = post.comments.length===0?<p>Be the first to make a comment!</p>:<p>{post.comments[0].message}</p>

  const allComments = 
  <div>
    <p className="all-comments">
      {post.comments.map((comments) => {return <p>{comments.message}</p>})}
    </p>
  </div>

  const showCommentsLink=showComments?'Hide':'Show'

  const commentForm =
  <form id ='input' onSubmit={handleSubmit}>
    <textarea id='input' rows="2" value={body} onChange={(event) => setBody(event.target.value)} />
    <button id="comment-button" type="submit" value="Submit">Comment</button>
  </form>

  const commentFormLink=addCommentForm?'Done':'Comment'


  return (
    <div id="post">
      <article data-cy="post" key={ post._id }>
      <p id="userName">{userName}</p><p>{ post.message }</p>
      <p className='timePosted'>Posted: {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</p>
       <button onClick={handleLikes} id="like-button">
          {hasBeenLiked() ? (
            <>&#128078; Unlike {post.likes.length > 0 && post.likes.length}</>
          ) : (
            <>&#128077; Like {post.likes.length > 0 && post.likes.length}</>
          )}
        </button>
        <div>
          <div id='comments' role="comments">
            {!showComments && firstComment}
            {showComments && allComments}
            <button id="comment-button" onClick={() => {setShowComments(!showComments)}}><p>&#128064;{showCommentsLink}</p></button>   
            <button id="comment-button" onClick={() => {setAddCommentForm(!addCommentForm)}}><p>&#128172;{commentFormLink}</p></button>
          </div>
          <div id='add-comment'>
            {addCommentForm && commentForm}
          </div>
        </div>
      </article>
    </div>
  )
   
}
export default Post;
