import "./FriendRequestReceived.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FriendRequestReceived = ({ friendRequester, setFriendsUpdated }) => {
  const token = window.localStorage.getItem("token");

  // Accept friend request
  const handleClickAccept = () => {
    fetch('/friends/accept', {
      method: "POST",
      header: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ senderId: friendRequester._id, receiverId: window.localStorage.getItem("user_id") }),
    })
      .then(() => {
        setFriendsUpdated(true);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // Reject friend request
  const handleClickReject = () => {
    fetch('/friends/reject', {
      method: "POST",
      header: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ senderId: friendRequester._id, receiverId: window.localStorage.getItem("user_id") }),
    })
      .then(() => {
        setFriendsUpdated(true);
      })
      .catch((err) => {
        console.log(err);
      })
  }
  
  return (
    <div className="friend-request-received-container">
      {/* Add profile picture of person sending friend request, with link to their profile */}
      <Link to={`/users/${friendRequester._id}`} className="username-link">
        <h4>{ friendRequester.name }</h4>
      </Link>
      <button className="friend-request-button" onClick={handleClickAccept}>Accept</button>
      <button className="friend-request-button" onClick={handleClickReject}>Reject</button>
    </div>
  );
}

export default FriendRequestReceived;