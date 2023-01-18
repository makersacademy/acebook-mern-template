import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./profile.css";
import Feed from "../feed/Feed";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [selectedTab, setSelectedTab] = useState("posts");
  const token = window.localStorage.getItem("token");
  const { user_id } = useParams();

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
      }
    };
    fetchProfile();
  }, []);

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
              <div className="profile-picture-container">
                <img
                  className="profile-picture"
                  src="https://wallpapersmug.com/download/3840x2400/43b4da/dwayne-johnson-face-jumanji-welcome-to-the-jungle-8k.jpg"
                  alt="profile"
                />
              </div>
              <div className="profile-name">{profile.user.name}</div>
            </div>
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
