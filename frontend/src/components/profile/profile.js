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
  const [imageInput, setImageInput] = useState("")
  const[coverImageInput, setCoverImageInput] = useState("")
  const { user_id } = useParams();

  const handleCoverImageUpload = async (event) => {
    // Event listener to get the hosted image info
      console.log(`Cover image input should be ${event.info.url}`);
      const coverImageUrl = event.info.url;
      console.log(coverImageUrl)
      setCoverImageInput(coverImageUrl);
      console.log(`Cover image input is  ${coverImageInput}`);
    };

    const handleProfileImageUpload  = async (event) => {
      // Event listener to get the hosted image info
        console.log(`image input should be ${event.info.url}`);
        const imageUrl = event.info.url;
        console.log(imageUrl)
        setImageInput(imageUrl);
        console.log(`image input is  ${imageInput}`);
      };


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

  const handleSubmit = async (event) => {
    if (event.target.getAttribute("data-button-id") === "cover-image-upload") {
      // do something for button 1
    } else  {
      // do something for button 2
    
      event.preventDefault();
      console.log(`image input during handlesubmits is ${imageInput}`)
      if (imageInput === "") {
        console.log('no image input!')
      }
      const userId = window.localStorage.getItem("user_id")
      let response = await fetch(`/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ profilePicture: imageInput }),
      });

      if (response.status === 201) {
        setImageInput("");
        setIsUpdated(true);
        console.log(`/users/${userId}`)
      }
    }
  };

  const handleCoverSubmit = async (event) => {
    event.preventDefault();
    console.log(`Cover image input during handlesubmits is ${coverImageInput}`)
    if (coverImageInput === "") {
      console.log('noCover image input!')
    }
    const userId = window.localStorage.getItem("user_id")
    let response = await fetch(`/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ coverPicture: coverImageInput }),
    });

    if (response.status === 201) {
      setCoverImageInput("");
      setIsUpdated(true);
      console.log(`/users/${userId}`)
    }
  };

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
                backgroundImage: `url(${profile.user.coverPicture})`,
              }}
            >
              <div className="profile-picture-container-page">
                <img
                  className="profile-picture-page"
                  src={profile.user.profilePicture}
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
                <button data-button-id="profile-image-upload"className="submit-post" onClick={handleSubmit}>
                Confirm & submit
                </button>
                <p>Cover Image:</p>
                < UploadWidget handleImageUpload={handleCoverImageUpload}/>
                <button data-button-id="cover-image-upload" className="submit-cover-photo" onClick={handleCoverSubmit}>
                Confirm & submit
                </button>
                
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
