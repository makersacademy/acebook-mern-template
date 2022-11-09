import { useEffect } from "react"
import FriendCard from "./FriendCard"
import { useState } from "react";

export default function Friendslist () {
  
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
 
  // Runs on start
  useEffect(() => {
    reload()
  }, [])

  return (
    <>
      <h1>FriendsList!</h1>
      <div className="friends-card-container">
        {friends.map(friend => <FriendCard friend={friend}/>)}
      </div>
    </>
  )
}