import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserInfo = () => {
    const [userInfo, setUserInfo] = useState([])
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const { userId } = useParams();
    console.log(userId)

    useEffect(() => {
        if(token) {
            fetch(`/users/${userId}`, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
            })
              .then(response => response.json())
              .then(async data => {
                // window.localStorage.setItem("token", data.token)
                // setToken(window.localStorage.getItem("token"))
                setUserInfo(data.userInfo);
            })
        }
    }, [])

    // add an else block to redirect to somewhere 
    // or show message if no authorisation
    // redirect to posts maybe

        return(
            <>
            <h2>Your Account Information</h2>
            <div>
                <p data-cy="username">Username: {userInfo.username}</p>
                <p data-cy="email">Email: {userInfo.email}</p>
            </div>
            {/* add redirect link to post page  */}
            </>
        ) 
}

export default UserInfo;