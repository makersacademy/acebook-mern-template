import Feed from '../feed/Feed';
import React, { useState } from 'react';

function Profile({ navigate }) {
  const [reload, setReload] = useState(false);

  return (
    <>
      <h2>Profile</h2>
      <Feed
        navigate={navigate}
        path={'/account'}
        reload={reload}
        setReload={setReload}
      ></Feed>
    </>
  );
}

export default Profile;
