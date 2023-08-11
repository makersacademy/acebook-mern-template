import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavigationBar from '../navigation/Navigation';
import './userInfo.css'

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
                window.localStorage.setItem("token", data.token);
                setToken(window.localStorage.getItem("token"));
                setUserInfo(data);
            })
        } 
    }, [])     

    return(
        <>
        <NavigationBar />
        <div className='info-div'>
        <h2 className='heading'>Account Information</h2>
        <div>
            <p className='username' data-cy="username">Username: {userInfo.username}</p>
            <p className='email' data-cy="email">Email: {userInfo.email}</p>
        </div>
        <a href="/posts">Go back to my feed </a>
        </div>
        </>
        ) 
}

export default UserInfo;