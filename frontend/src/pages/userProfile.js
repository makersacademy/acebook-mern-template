import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const dp1 = require('./images/dp1.jpeg') // adds image

const UserProfile = ({ navigate }) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const { id } = useParams();
  
  useEffect(() => {
    if(token) {
      fetch("/users", {
        headers: {
          'Authorization': `Bearer ${token}`,
          'User_ID': `${id}`
        }
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))
          setUser(data.user);
        })
    }
  }, [])

  
  return (
    <>
    <h2 data-cy="user"> {user.username} Profile! </h2> 
    <h3> Your posts </h3>
    <img src={dp1} alt="dp1" />
    
    </>
  );

};

export default UserProfile;