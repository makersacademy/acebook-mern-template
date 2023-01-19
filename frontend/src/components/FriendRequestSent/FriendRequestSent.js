import "./FriendRequestSent.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FriendRequestSent = ({ requestedFriend, setFriendsUpdated }) => {
  const token = window.localStorage.getItem("token");

  // Do once back end for cancel sent friend request is sorted
  // Cancel sent friend request
  const handleClickCancel = () => {
    fetch('/friends/cancel', {
      method: "POST",
      header: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ senderId: window.localStorage.getItem("user_id"), receiverId: requestedFriend._id }),
    })
      .then(() => {
        setFriendsUpdated(true);
      })
      .catch((err) => {
        console.log(err);
      })
  }
  
  return (
    <div className="friend-request-sent-container">
      {/* Profile picture of person sending friend request, with link to their profile */}
      <Link to={`/users/${requestedFriend._id}`} className="username-link">
        <h4>{ requestedFriend.name }</h4>
      </Link>
      <button className="friend-request-button" onClick={handleClickCancel}>Cancel friend request</button>
    </div>
  );
}
 
export default FriendRequestSent;