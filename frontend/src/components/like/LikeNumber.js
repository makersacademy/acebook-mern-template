import React from "react"

const LikeNumber = (props) => {
    console.log(props.userIDList);
    console.log(props.count);
    return <span className="like-count" data-cy="post-likes">{props.count}</span>
}

export default LikeNumber