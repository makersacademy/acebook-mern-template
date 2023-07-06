import React from "react";
import { Link } from "react-router-dom";

const FeedButton = () => {
  return (
    <Link to="/" className="feed-button">
      <button className="notification-button">Back to Feed</button>
    </Link>
  );
};

export default FeedButton;
