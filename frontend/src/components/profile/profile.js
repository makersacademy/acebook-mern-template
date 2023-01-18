import { useEffect, useState } from "react";
import Post from "../post/Post";
import { useParams } from "react-router";
import "./profile.css";
import Feed from "../feed/Feed";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [newName, setNewName] = useState("");
  const [updatedName, setUpdatedName] = useState(false);
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
        setUpdatedName(false);
      }
    };
    fetchProfile();
  }, [updatedName]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    let response = await fetch(`/users/${user_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: newName }),
    });

    if (response.status === 200) {
      setUpdatedName(true);
    }
  };

  return (
    <>
      <div class="profile-container">
        {profile && <div>Name: {profile.user.name}</div>}
        <div>Bio: Stuff here</div>
        <div>Birthday: 11/11/11</div>
        <div>Other stuff idk</div>
        <form onSubmit={handleUpdate}>
          <label>
            Update Name:
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </label>
          <button className="update-button">Update</button>
        </form>
      </div>
      <Feed filter={user_id} />
    </>
  );
};

export default Profile;
