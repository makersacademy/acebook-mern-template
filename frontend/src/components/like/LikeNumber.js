import React from "react"

const LikeNumber = (props) => {
    return <span className="like-count" data-cy="post-likes">{props.count}</span>
}

export default LikeNumber