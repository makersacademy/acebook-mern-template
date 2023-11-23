import Feed from "../../feed/Feed";
import React, { useEffect, useState } from "react";

const ProfileTemplate = (props) => {
  /*
    Contains  presentational logic for Profile Component.
    Handles following/followers updates.
    
    Parents:
        - Profile component.
    Children:
        ...
    */
  // Array following users by currently logged user
  const following = props.following;
  const setFollowing = props.setFollowing;

  let newFollowing = props.following;

  //Var to load following state of viewed profile.
  const [isFollowing, setIsFollowing] = useState(null);

  //On Init comppnent sets is Following by checking if current User Id is in following.
  useEffect(() => {
    if (following) {
      if (following.includes(props.user._id)) {
        setIsFollowing(true);
      } else {
        setIsFollowing(false);
      }
    }
  });
  //Handle follow funciton.
  const handleFollow = (event) => {
    event.preventDefault();
    if (newFollowing.includes(props.user._id)) {
      const idIndex = following.indexOf(props.user_id);
      newFollowing.splice(idIndex, 1);
      setFollowing(newFollowing);
      setIsFollowing(false);
    } else {
      newFollowing.push(props.user._id);
      setIsFollowing(true);
    }
    console.log(newFollowing);

    fetch(`/api/users/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        following: newFollowing,
        userId: props.currentUserId,
      }),
    });
  };

  return (
    <div className="profile-container">
      <h1>My profile</h1>
      {/* Profile picture */}
      <img src="profileImg.webp" className="profilePic" alt="thumb" />
      <h2 data-cy="names">
        {/* Username data */}
        {props.user.firstName} {props.user.lastName}
      </h2>
      <div className="button-container">
        {/* Edit/Share profile */}
        {/* TODO: Add Edit Profile link */}
        {props.user._id == props.currentUserId ? (
          <button className="primary-btn m-btn">Edit Profile</button>
        ) : (
          <form onSubmit={handleFollow}>
            <button
              className={`m-btn primary-btn ${
                isFollowing ? "unfollow-btn" : ""
              }`}
              type="submit"
            >
              {isFollowing ? <>Unfollow</> : <>Follow</>}
            </button>
          </form>
        )}
        {/* TODO: Add Edit Share link */}
        <button className="primary-btn">Share Profile</button>
      </div>
      <div className="profile-info row">
        {/* Number of Posts/Followers/Following Info */}
        <div className="col">
          <span>
            <strong>{props.user.posts.length}</strong>
          </span>
          <span>Posts</span>
        </div>
        <div className="col">
          <span>
            <strong>{props.user.followers.length}</strong>
          </span>
          <span>Followers</span>
        </div>
        <div className="col">
          <span>
            <strong>{props.user.following.length}</strong>
          </span>
          <span>Following</span>
        </div>
      </div>

      {/* Profile feed */}
      {/* TODO: Change to Your Profile Feed */}
      <div className="feed-container">
        <Feed />
      </div>
    </div>
  );
};
export default ProfileTemplate;
