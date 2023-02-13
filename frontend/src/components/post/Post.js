import React from "react";


const Post = ({ post, setPosts, comment, setComment, posts, token }) => {
  const handleDeletePost = async (id) => {
    await fetch(`/posts/${id}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log(response);
      if (response.status === 200) {
        setPosts(posts.filter((post) => post._id !== id));
      }
    });
  };

  const handleCommentPost = async(event) => {}

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };


  return (
    <>
     <div class="postContent">{post.message}</div>

     <div class="postButtons">
                        
      <button id='like'>Like</button>
      <button onClick={() => handleDeletePost(post._id)}>Delete</button>
      <input id='commentButton' type="submit" value="Comment" />
                        
      <div class="commentField">
        <form onSubmit={handleCommentPost}>
        <input placeholder="Write your comment here" id="comment" type='comment' defaultValue={comment} onChange={handleCommentChange} />
        </form>
      </div>

      </div>

      <div class="comments">
        Comments:
      </div>

      {post.comments.map((comment) => (
        <div data-cy="comment" class="comment">
          {comment.message}
        </div>  
      ))}
    </>
  );
};

export default Post;
