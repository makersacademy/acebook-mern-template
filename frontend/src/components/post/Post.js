const Post = ({ post }) => {
  return (
    <article data-cy="post" key={post._id}>
      Post from {post.user.name}:{post.message}
    </article>
  );
};

export default Post;
