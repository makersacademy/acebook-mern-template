import React, { useEffect, useState } from "react";

const MessageHeader = ({ user_id, navigate }) => {
	const [userData, setUserData] = useState(null);
	const userProfileUrl = `/profile/${user_id}`

	
	const getData = async () => {
		const GetUserInfo = await fetch(`users/userinfo/${user_id}`)

		if (GetUserInfo.ok) {
			const response = await GetUserInfo.json();
			setUserData(response.user)
			
			} else {
				console.error(`Error fetching user data`)
			}
		}
  useEffect(() => {
		getData();
	}, [user_id]);
	
	return (
    <header>
      {userData ? (
        <>
          <img width="50px" src={"../images/avatars/"+userData.avatar} alt="User Avatar" id="profile-pic"></img>
          <a href={userProfileUrl} id="header-username"> {userData.username} </a>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </header>
  );
};

export default MessageHeader;