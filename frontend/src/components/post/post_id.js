import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PostId = () => {
  const [post, setPost] = useState({});
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [comment, setComment] = useState("");
  const [allPostComments, setAllPostComments] = useState(["This post has no comments"]);

  const { id } = useParams();

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = async () => {
    let response = await fetch(`/posts/${id}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ comment: comment }),
    });

    const responseStatus = response.status;
    response = await response.json();

    if (responseStatus === 201) {
      window.localStorage.setItem("token", response.token);
      setToken(window.localStorage.getItem("token"));
      
      setPost((prevPost) => ({
        ...prevPost,
        comments: response.post.comments,
      }));
    }
  };



  useEffect(() => {
    setAllPostComments(post.comments)
  }, [post]);

  useEffect(() => {
    fetch(`/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(async (data) => {
        window.localStorage.setItem("token", data.token);
        setToken(window.localStorage.getItem("token"));
        setPost({
          message: data.message,
          author: data.author,
          comments: data.comments,
        });
      });
  }, []);

  return (
    <div>
      <div>
        <p data-cy="post">{post.message}</p>
        <p data-cy="author">by {post.author}</p>
      </div>

      <div>
        <ul data-cy="comments">
          {allPostComments &&
            allPostComments.map((commentObject, index) => {
              return <li key={index}>{commentObject.comment}</li>;
            })}
        </ul>
      </div>
      <div>
        <input
          type="text"
          value={comment}
          onChange={handleCommentChange}
          placeholder="Add a comment..."
        />
        <button onClick={handleCommentSubmit}>Submit Comment</button>
      </div>
    </div>
  );
};

export default PostId;
