import FriendsList from "../FriendsList/FriendsList";
import FriendRequestReceived from "../FriendRequestReceived/FriendRequestReceived";
import FriendRequestSent from "../FriendRequestSent/FriendRequestSent";
import "./FriendsPage.css";
import React, { useEffect, useState } from "react";

const FriendsPage = ({ navigate }) => {
  const [friends, setFriends] = useState([]);
  const [friendRequestsSent, setFriendRequestsSent] = useState([]);
  const [friendRequestsReceived, setFriendRequestsReceived] = useState([]);
  const [friendsUpdated, setFriendsUpdated] = useState(false);
  const token = window.localStorage.getItem("token");
  const userId = window.localStorage.getItem("user_id");

  // Fetch friend data for logged in user
  useEffect(() => {
    if (token) {
      fetch(`/friends/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          setFriends(data.user.friends);
          setFriendRequestsSent(data.user.friendRequestsSent);
          setFriendRequestsReceived(data.user.friendRequestsReceived);
          setFriendsUpdated(false);
        });
    } else {
      navigate("/login");
    }
  }, [friendsUpdated]);

  return (
    <div className="friends-page-container">
      {friends && (
        <div className="friend-requests-container">
          <h2 className="heading">Friend requests</h2>
          <h3 className="received-sent-heading">Received</h3>
          { friendRequestsReceived.length !== 0 ?
              friendRequestsReceived.map((friendRequester) => (
              <FriendRequestReceived
                friendRequester={friendRequester}
                key={friendRequester._id}
                setFriendsUpdated={setFriendsUpdated}
              />
              )) :
              <div className="no-friends-message-container">
                <p className="no-friends-message">No pending requests</p>
              </div>
          }
          <h3 className="received-sent-heading">Sent</h3>
          { friendRequestsSent.length !== 0 ?
              friendRequestsSent.map((requestedFriend) => (
                <FriendRequestSent
                  requestedFriend={requestedFriend}
                  key={requestedFriend._id}
                  setFriendsUpdated={setFriendsUpdated}
                />
              )) :
              <div className="no-friends-message-container">
              <p className="no-friends-message">No pending requests</p>
            </div>
          }
        </div>
      )}
      {friends && <FriendsList friends={friends} setFriendsUpdated={setFriendsUpdated} />}
    </div>
  );
};

export default FriendsPage;
