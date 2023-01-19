import "./Friend.css";
import { Link } from "react-router-dom";


const Friend = ({ friend, setFriendsUpdated }) => {
  
  const userId = window.localStorage.getItem("User")

  // Remove friend
  const handleClickRemove = () => {
    fetch("/delete/", {
      method: "DELETE",
      body: JSON.stringify({ userId: window.localStorage.getItem("user_id"), friendId: friend._id })
    })
      .then(() => {
        setFriendsUpdated(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="friend-container">
      {/* Profile picture of person sending friend request, with link to their profile */}
      <Link to={`/users/${friend._id}`} className="username-link">
        <h4>{ friend.name }</h4>
      </Link>
      <button className="remove-friend-button" onClick={handleClickRemove}>Remove friend</button>
    </div>
  );
}
 
export default Friend;