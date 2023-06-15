import React, { useEffect, useState } from "react";
import './userConnections.css';

const UserConnections = ({userId, token, setToken}) => {
  const [users, setUsers] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);


  useEffect(() => {
    fetch("/users")
      .then(response => response.json())
      .then(data => {
        if (data.users) {
          setUsers(data.users);
        }
      });
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter(user => {
        return user.name.toLowerCase().match(userInput.toLowerCase());
      })
    );
  }, [userInput, users]);

  const handleUserInput = e => {
    setUserInput(e.target.value);
  };

  const addFriend = async (friendId) => {
    let response = await fetch("/userconnections", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ userId: userId, friendId: friendId })
    })

    if (response.status === 201) {
      let data = await response.json();
      setToken(data.token);
    } else {
      console.log("Failed to add friend");
    }
  }

  return (
    <>
      <div className="friend-container">
        <h2>Find friends</h2>
        <input type="text" value={userInput} onChange={handleUserInput} placeholder="Friend's name" />
        {(userInput !== "") && (<div>
          {
            filteredUsers.map(user => 
              <div className="friend" key={user._id}>
                <img src={user.avatar} alt="user avatar" width="20"/>
                <p>{user.name}</p>
                <button onClick={() => addFriend(user._id)}>Add friend</button>
              </div>)
          }
        </div>)}
      </div>
    </>
  );
};

export default UserConnections;
