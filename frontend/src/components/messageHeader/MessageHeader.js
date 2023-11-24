import React, { useEffect, useState } from "react";

const MessageHeader = ({ user_id, navigate }) => {
	const [userData, setUserData] = useState(null);
	const [token, setToken] = useState(window.localStorage.getItem("token"));
	const userProfileUrl = `/profile/${user_id}`

	const getData = async () => {
		// const GetUserInfo = await fetch(`users/userinfo/${user_id}`)
		const GetUserInfo = await fetch(`users/userinfo/${user_id}`, {
			headers: {
			  'Authorization': `Bearer ${token}`
			}
		  });
		if (GetUserInfo.ok) {
			// console.log("USER ID PASSED 6560a824d9cd1db4bc7c1615 = ", user_id)
			const response = await GetUserInfo.json();
			window.localStorage.setItem("token", response.token);
          	setToken(window.localStorage.getItem("token"));
			setUserData(response.user)
			
			} else {
				// console.log("ERROR ID PASSED 6560a824d9cd1db4bc7c1615 = ", user_id)
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