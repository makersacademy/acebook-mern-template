import React from "react";

const LikeNumber = (props) => {

    return <span className="like-count" data-cy="post-likes">{props.userIDList.length}</span>;
}

export default LikeNumber