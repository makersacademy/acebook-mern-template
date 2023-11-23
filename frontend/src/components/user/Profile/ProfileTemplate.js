import Feed from "../../feed/Feed";

const ProfileTemplate = (props) => {
  const following = props.following;
  const setFollowing = props.setFollowing;
  let newFollowing = props.following;
  console.log(newFollowing);
  // if (following.includes(props.currentUserId)) {
  //     console.log("Peter")
  // } else {
  //     console.log("Anto")
  // }
  const handleFollow = (event) => {
    event.preventDefault();
    if (newFollowing.includes(props.currentUserId)) {
      const idIndex = following.indexOf(props.currentUserId);
      newFollowing.splice(idIndex, 1);
      setFollowing(newFollowing);
    } else {
      newFollowing.push(props.currentUserId)
    }
    console.log(newFollowing);
    // TODO:
    // If profileUserId in followers:
    // Remove from followers
    // Else
    //Add to followers
    // Fetch Update

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
            <button className="primary-btn m-btn" type="submit">
              Follow
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
            {/* TODO: Change to followers when Model Updated */}
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
