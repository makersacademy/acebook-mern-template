import React, { useEffect, useState } from "react";
import Header from "./header/Header";
import { jwtDecode } from "jwt-decode";

const UserAccount = ({ navigate }) => {
    const [user, setUser] = useState({});
    const [token, setToken] = useState(window.localStorage.getItem("token"));

    // Obtaining user_id for logged in user from token
    const decoded = jwtDecode(token);
    const user_id = decoded.user_id;

    // Fetches user data from backend based on user_id.
    // Duplication here with fetch request in header component but necessary 
    // to create universal header component whilst providing UserAccount component 
    // access to other user data).
    console.log("token at start of UserAccount = " + token)
    useEffect(() => {
        if(token) {
            fetch(`/users/data/${user_id}`, {
                headers: {
                Authorization: `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(async data => {
                window.localStorage.setItem("token", data.token)
                setToken(data.token)
                setUser(data.user);
                })
                .catch(error => console.error('Error fetching user data:', error))
            }
        }, [])


    // Returns page with header component containing username and avatar based on logged-in user's user_id.
    if(token) {     
        return(
            <>
                <h2> {user.username}'s Account</h2>
                    <div id='user-account-page' role="main">
                        <Header user_id={ user_id } />
                    </div>
            </>
        )
    } else {
        navigate('/login')
    }
}

export default UserAccount;
