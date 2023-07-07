import React from "react";

const Like = ({ like }) => {
  return (
    <div className="like-container" data-cy="like" key={like._id} id={like._id}>
      <div className="username">{like.username}</div>
    </div>
  );
};

export default Like;
