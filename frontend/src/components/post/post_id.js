import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PostId = () => {
  const [post, setPost] = useState({});
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [comment, setComment] = useState("");

  const { id } = useParams();

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = async () => {
           let response = await fetch( `/posts/${id}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ comment: comment })
            });
            console.log(comment)
            response = await response.json()
            if(response.status === 201) {
                window.localStorage.setItem("token", response.token);
                setToken(window.localStorage.getItem("token"));
                setPost({
                  message: response.message,
                  author: response.author,
                  comments: response.post.comments,
                });
            }

  };

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
  }, {});

  return (
    <div>
      <p data-cy="post">{post.message}</p>
      <p data-cy="author">{post.author}</p>

      <div>
          <p data-cy="comments">{post.comments}</p>
      </div>

        {/* {console.log(post.comments)} */}

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
