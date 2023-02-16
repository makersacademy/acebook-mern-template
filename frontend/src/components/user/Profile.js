import React, { useEffect, useState } from "react";
import Post from "../post/Post";

const Profile = ({ navigate }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [user, setUser] = useState({});
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioInput, setBioInput] = useState("");

  const logout = () => {
    window.localStorage.removeItem("token");
    navigate("/login");
  };

  const profile = () => {
    navigate("/profile");
  };

    const fetchUser = async () => {
      const email = window.localStorage.getItem("email");
      const url = `/users?email=${email}`;

      try {
        const response = await fetch(url, {
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();
        const userData = {
          email: data.user.email,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          userId: data.user._id,
          bio: data.user.bio,
        };
        console.log(data)
        setUser(userData);
      } catch (error) {
        console.error(error);
      }
    };
    

    const handleEditBio = () => {
      setIsEditingBio(true);
      setBioInput(user.bio);
    };
    

  useEffect(() => {
    fetchUser();
  }, []);

  const updateBio = async (event) => {
    try {
      const response = await fetch(`/users/bio/${user.userId}`, {
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bio: bioInput }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      setUser((prevUser) => ({ ...prevUser, bio: data.bio }));
      setIsEditingBio(false);
      fetchUser(); // Fetch the updated user data after updating the bio
    } catch (error) {
      console.error(error);
    }
  };
  

  if (token) {
    return (
      <>
        <div>
          <nav className="nav">
            <a href="/posts" className="site-title">
              acebook
            </a>
            <ul>
              <button onClick={profile}>Profile</button>
              <button onClick={logout}>Logout</button>
              <br></br>
            </ul>
          </nav>
          <div id="feedComponent">
            <h1>{`${user.firstName} ${user.lastName}'s Profile Page`}</h1>
            <img class="profilePagePicture" src="graphics-avatar.jpeg" alt="profile" ></img>
          </div>
          <h3 id="bioTitle">Bio</h3>
          <div id="profileBio">
            {isEditingBio ? (
              <>
                <textarea
                  id="bioEdit"
                  type="text"
                  value={bioInput}
                  onChange={(e) => setBioInput(e.target.value)}
                />
                <button onClick={updateBio}>Submit</button>
              </>
            ) : (
              <>
                <div id="bioText">{user.bio ? user.bio : "You have no bio, please write one!"}</div>
                <button onClick={handleEditBio}>Edit Bio</button>
              </>
            )}
          </div>
          <h3 id="friendsListTitle">Friends List</h3>
          <div id="friendsList">
            <div class="friendElement">You currently have no friends....that's ok if you prefer to keep it simple!</div>
          </div>
        </div>
      </>
    );
  } else {
    navigate("/signin");
  }
};

export default Profile
