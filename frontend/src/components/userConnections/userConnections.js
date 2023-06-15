import React, { useEffect, useState } from "react";

const UserConnections = () => {
  const [users, setUsers] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [filteredUsers, setFilteredUsers] = useState("");
  console.log(filteredUsers);

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

  return (
    <>
      <p>Find friends</p>
      <div>
        <input type="text" value={userInput} onChange={handleUserInput} placeholder="Friend's name" />
        <div>
          {users.forEach(user => {
            if (user.name.match(userInput)) {
              return <div>hello</div>;
            }
          })}
        </div>
      </div>
    </>
  );
};

export default UserConnections;
