import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserInfo = ({navigate}) => {
    const [userInfo, setUserInfo] = useState([])
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const { userId } = useParams();

    useEffect( () => {
        if(token) {
            fetch(`/users/${userId}`, {
              headers: {'Authorization': `Bearer ${token}`}
            })
            .then (response => response.json())
            .then(data => {
                window.localStorage.setItem("token", data.token);
                setToken(window.localStorage.getItem("token"));
                setUserInfo(data);
            })
        }    
    }, [])     

    if (token){
    return(
        <>
        <h2>Your Account Information</h2>
        <div>
            <p data-cy="username">Username: {userInfo.username}</p>
            <p data-cy="email">Email: {userInfo.email}</p>
        </div>
        <a href="/posts">Go back to my feed </a>
        </>
        ) 
    } else {
        navigate('/login')
    }
}

export default UserInfo;