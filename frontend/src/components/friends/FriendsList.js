import { useEffect } from "react"
import FriendCard from "./FriendCard"

export default function Friendslist (props) {
  const reload = props.reload;
  const friends = props.friends;

 
  // Runs on start
  useEffect(() => {
    reload()
  }, [])

  return (
      <div className="friends-card-container">
        {friends.map(friend => <FriendCard friend={friend}/>)}
      </div>
  )
}