import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./profile.css";
import Feed from "../feed/Feed";
import UploadWidget from "../CreatePost/UploadWidget"

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [selectedTab, setSelectedTab] = useState("posts");
  const [isUpdated, setIsUpdated] = useState(false);
  const token = window.localStorage.getItem("token");
  const [showWidget, setShowWidget] = useState(false)
  const [imageInput, setImageInput] = useState("")
  const { user_id } = useParams();

  const handleProfileImageUpload = (event) => {
    // Event listener to get the hosted image info
      console.log(`image input should be ${event.info.url}`);
      const imageUrl = event.info.url;
      console.log(imageUrl)
      setImageInput(imageUrl);
      setShowWidget(true)
      console.log(`image input is  ${imageInput}`);
    };

    // const handleSubmit = async (event) => {
    //   event.preventDefault();
    //   let response = await fetch("/pos", {
    //     method: "post",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //     body: JSON.stringify({ message: postInput, author: window.localStorage.getItem("user_id"), image: imageInput }),
    //   });

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch(`/users/${user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.status === 200) {
        setProfile(data);
        setIsUpdated(false);
      }
    };
    fetchProfile();
  }, [isUpdated]);

  const handleSendFriendRequest = async (event) => {
    event.preventDefault();

    const response = await fetch(`/friends/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        senderId: window.localStorage.getItem("user_id"),
        receiverId: user_id,
      }),
    });

    if (response.status === 200) {
      setIsUpdated(true);
    }
  };

  const handleAcceptFriendRequest = async (event) => {
    event.preventDefault();

    const response = await fetch(`/friends/accept/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        senderId: user_id,
        receiverId: window.localStorage.getItem("user_id"),
      }),
    });

    if (response.status === 200) {
      setIsUpdated(true);
    }
  };

  const handleRejectFriendRequest = async (event) => {
    event.preventDefault();

    const response = await fetch(`/friends/reject/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        senderId: user_id,
        receiverId: window.localStorage.getItem("user_id"),
      }),
    });

    if (response.status === 200) {
      setIsUpdated(true);
    }
  };

  const handleCancelFriendRequest = async (event) => {
    event.preventDefault();

    const response = await fetch(`/friends/cancel/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        senderId: window.localStorage.getItem("user_id"),
        receiverId: user_id,
      }),
    });

    if (response.status === 200) {
      setIsUpdated(true);
    }
  };

  const handleRemoveFriend = async (event) => {
    event.preventDefault();

    const response = await fetch(`/friends/delete/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: window.localStorage.getItem("user_id"),
        friendId: user_id,
      }),
    });

    if (response.status === 200) {
      setIsUpdated(true);
    }
  };

  return (
    <>
      {profile && (
        <>
          <div className="profile-header">
            <div
              className="cover-photo"
              style={{
                backgroundImage: `url(${"https://images.unsplash.com/photo-1608501078713-8e445a709b39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbHBhcGVyJTIwNGt8ZW58MHx8MHx8&w=1000&q=80"})`,
              }}
            >
              <div className="profile-picture-container-page">
                <img
                  className="profile-picture-page"
                  src="https://wallpapersmug.com/download/3840x2400/43b4da/dwayne-johnson-face-jumanji-welcome-to-the-jungle-8k.jpg"
                  alt="profile"
                />
              </div>
              <div className="profile-name">{profile.user.name}</div>
            </div>
          </div>
          <div className="button-container">
            {window.localStorage.getItem("user_id") === user_id ? (
              <></>
            ) : profile.user.friends.includes(
                window.localStorage.getItem("user_id")
              ) ? (
              <button
                className="remove-friend-button"
                onClick={handleRemoveFriend}
              >
                Remove Friend
              </button>
            ) : profile.user.friendRequestsReceived.includes(
                window.localStorage.getItem("user_id")
              ) ? (
              <button
                className="cancel-friend-request-button"
                onClick={handleCancelFriendRequest}
              >
                Cancel Friend Request
              </button>
            ) : profile.user.friendRequestsSent.includes(
                window.localStorage.getItem("user_id")
              ) ? (
              <>
                <button
                  className="accept-friend-request-button"
                  onClick={handleAcceptFriendRequest}
                >
                  Accept Friend Request
                </button>
                <button
                  className="reject-friend-request-button"
                  onClick={handleRejectFriendRequest}
                >
                  Reject Friend Request
                </button>
              </>
            ) : (
              <button
                className="send-friend-request-button"
                onClick={handleSendFriendRequest}
              >
                Send Friend Request
              </button>
            )}
          </div>
          <div className="tabs-container">
            <button
              className={`tab-button ${
                selectedTab === "about" ? "active" : ""
              }`}
              onClick={() => setSelectedTab("about")}
            >
              About
            </button>
            <button
              className={`tab-button ${
                selectedTab === "posts" ? "active" : ""
              }`}
              onClick={() => setSelectedTab("posts")}
            >
              Posts
            </button>
          </div>
          <div className="profile-container">
            {selectedTab === "about" ? (
              <div className="about-section">
                <div>Bio: Stuff here</div>
                <div>Birthday: 11/11/11</div>
                <div>Other stuff idk</div>
                <p>Profile Picture:</p>
                < UploadWidget handleImageUpload={handleProfileImageUpload}/>
                <p>Cover Photo:</p>
                < UploadWidget handleImageUpload={handleProfileImageUpload}/>
              </div>
            ) : (
              <Feed filter={user_id} />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
