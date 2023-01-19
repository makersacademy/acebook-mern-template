import "../FriendsPage/FriendsPage.css";
import { Link } from "react-router-dom";


const Friend = ({ friend, setFriendsUpdated }) => {
  const token = window.localStorage.getItem("token");

  // Remove friend
  const handleClickRemove = () => {
    fetch("/friends/delete/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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
      {/* Add profile picture of person sending friend request, with link to their profile */}
      <Link to={`/users/${friend._id}`} className="username-link">
        <h3 className="f-username">{ friend.name }</h3>
      </Link>
      <button className="f-remove-friend-button" onClick={handleClickRemove}>Remove friend</button>
    </div>
  );
}
 
export default Friend;