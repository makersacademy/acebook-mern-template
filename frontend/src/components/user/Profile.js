import React, { useEffect, useState } from "react";

const Profile = ({ navigate }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [user, setUser] = useState({});
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioInput, setBioInput] = useState("");

  const [showUpload, setShowUpload] = useState(false);
  const [imageURL, setImageURL] = useState(user.profilePicture);

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
          profilePicture: data.user.profilePicture
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

  const handleProfileImageUpdate = async (event) => {
    const file = event.target.files[0];
  
    try {
      const formData = new FormData();
      formData.append("image", file);
  
      const response = await fetch(`/users/profile-picture/${user.userId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      const data = await response.json()
      const imageURL = data.url.toString(); // convert to string
      setImageURL(imageURL);
  
      await fetch(`/users/profile-picture/${user.userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ profilePicture: imageURL }),
      });
  
    } catch (error) {
      console.error(error);
    }
    await fetchUser()
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
            <img
              className="profilePagePicture"
              src={user.profilePicture}
              alt="profile"
            />
            <button id="changeProfilePictureButton" onClick={() => setShowUpload(true)}>Change Profile Picture</button>
            {showUpload && (
              <div>
                <input type="file" accept="image/*" onChange={handleProfileImageUpdate} />
                <button onClick={() => setShowUpload(false)}>Submit</button>
              </div>
            )}
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
                <div id="bioText">
                  {user.bio ? user.bio : "You have no bio, please write one!"}
                </div>
                <button onClick={handleEditBio}>Edit Bio</button>
              </>
            )}
          </div>
          <h3 id="friendsListTitle">Friends List</h3>
          <div id="friendsList">
            <div class="friendElement">
              You currently have no friends....that's ok if you prefer to keep it simple!
            </div>
          </div>
        </div>
      </>
    );
  } else {
    navigate("/signin");
  }
};

export default Profile
