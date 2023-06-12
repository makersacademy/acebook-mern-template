import React, { useState, useEffect } from 'react';
// import { useEffect } from 'react';

const UsernamePage = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/users/user_id/username');

      if (response.ok) {
        const data = await response.json();
        setUsername(data.username);
      } else {
        throw new Error('Failed to fetch username');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Retrieve Username</h1>
      <h2>Username: {username}</h2>
    </div>
  );
};

export default UsernamePage;
