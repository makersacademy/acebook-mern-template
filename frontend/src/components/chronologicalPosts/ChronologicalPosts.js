import React from 'react';
import Post from '../post/Post';

const ChronologicalPosts = ({ posts }) => {
  // `posts` must be an array and not null.
  // If you are waiting for a request to return an array,
  // wrap this component in a "loading" pattern as such:
  // posts ? <ChronologicalPosts posts={ posts }/> : <h2>Loading...</h2>
  return (
    <>
      <div className="chronological-posts">{
        posts
        .slice()
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((post) => {
          return (
            <Post post={ post }/>
          );
        })
      }</div>
    </>
  );
};

export default ChronologicalPosts;