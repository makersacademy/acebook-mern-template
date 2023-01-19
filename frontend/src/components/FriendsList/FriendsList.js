import Friend from "../Friend/Friend";
import "../FriendsPage/FriendsPage.css";

const FriendsList = ({ friends, setFriendsUpdated }) => {
  return (
    <div className="friends-list-container">
      { friends && (
        <>
          <h2 className="heading">Friends</h2>
          {/* Map through user's friends using Friend component, pass each friend info as a prop */}
          {friends.map((friend) =>
            <Friend friend={friend} key={friend._id} setFriendsUpdated={setFriendsUpdated} />
          )}
        </>
      )}
    </div>
  );
};

export default FriendsList;

