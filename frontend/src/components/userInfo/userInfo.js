import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavigationBar from '../navigation/Navigation';

const UserInfo = () => {
    const [userInfo, setUserInfo] = useState([])
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const { userId } = useParams();

    useEffect( () => {
        if(token) {
            fetch(`/users/${userId}`, {
                headers: {'Authorization': `Bearer ${token}`}
            })
            .then (response => response.json())
            .then( async data => {
                window.localStorage.setItem("token", token);
                setToken(window.localStorage.getItem("token"));
                setUserInfo(data);
            })
        } 
    }, [])     

    return(
        <>
        <NavigationBar />
        <h2>Your Account Information</h2>
        <div>
            <p data-cy="username">Username: {userInfo.username}</p>
            <p data-cy="email">Email: {userInfo.email}</p>
        </div>
        <a href="/posts">Go back to my feed </a>
        </>
        ) 
}

export default UserInfo;