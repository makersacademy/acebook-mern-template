import React, { useState } from 'react';
import CreatePostForm from '../createPostForm/createPostForm';
import Feed from '../feed/Feed';

const Posts = ({ navigate }) => {
  const [token, setToken] = useState(window.localStorage.getItem('token'));
  const [id, setId] = useState(window.localStorage.getItem('user_id'));
  const [reload, setReload] = useState(false);

  return (
    <>
      <CreatePostForm
        navigate={navigate}
        token={token}
        id={id}
        setReload={setReload}
        className='create-post-form'
      />
      <Feed
        navigate={navigate}
        reload={reload}
        setReload={setReload}
        className='feed'
      />
    </>
  );
};

export default Posts;
