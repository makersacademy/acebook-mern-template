      {/* <p className="post-message">{ post.message }</p> 
      <div className="button-container">
        {/* <button onClick={handleLike}>👍 | { post.like }</button>
        <button onClick={toggleComments}>
          { showComments ? 'Hide Comments' : `💬 (${post.comments.length})` }
        </button> 
      </div>
      {showComments && (
        <>
          <h3>Comments</h3>
            {post.comments.map(comment => 
              <p key={comment._id}>
                <strong>{comment.author.name}:</strong> {comment.comment} 
                <br />
                <small>{new Date(comment.date).toLocaleString()}</small>
              </p>
            )}
          <form onSubmit={handleComment}>
            <label>
              New Comment:
              <input type="text" value={newComment} onChange={(event) => setNewComment(event.target.value)} />
            </label>
            <button type="submit">Comment</button>
          </form>
        </>
      )}
    </article> */}

    .post-message {
  margin-bottom: 20px;
}

.button-container {
  display: flex;
  justify-content: flex-start;  /* aligns buttons to the left */
  margin-bottom: 10px;
}

.button-container button {
  margin-right: 10px;  /* adds some space between the buttons */
}