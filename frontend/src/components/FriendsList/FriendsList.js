import Friend from "../Friend/Friend";
import "../FriendsPage/FriendsPage.css";

const FriendsList = ({ friends, setFriendsUpdated }) => {

  return (
    <div className="friends-list-container">
      <h2 className="heading">Friends</h2>
      { friends.length !== 0 ?
          friends.map((friend) =>
            <Friend friend={friend} key={friend._id} setFriendsUpdated={setFriendsUpdated} />
          ) :
          <div className="no-friends-message-container">
            <p className="no-friends-message">Time to add some friends!</p>
          </div>
      }
    </div>
  );
};

export default FriendsList;

