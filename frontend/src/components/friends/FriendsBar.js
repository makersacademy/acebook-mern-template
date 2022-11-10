import FriendsForm from "./FriendForm";
import FriendsList from "./FriendsList";
import { useState } from "react";

export default function FriendsBar () {

  const [friends, setFriends] = useState([])
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const reload = () => {
    fetch("/friends/", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then((response) => response.json())
      .then(async (data) => {
        window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setFriends(data.friends);
      })
  }

  return (
    <div className='friends-bar'>
      <FriendsForm reload={ reload } />
      <FriendsList reload={ reload } friends={ friends } />
    </div>
  )
}