import React, { useEffect, useState } from "react";
import Header from "./header/Header";

const UserAccount = ({ navigate }) => {
    const [user, setUser] = useState({});
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    

    // Fetches user data from backend based on user_id.
    // Duplication here with fetch request in header component but necessary 
    // to create universal header component whilst providing UserAccount component 
    // access to other user data).
    useEffect(() => {
        if(token) {
            // get user_id from backend
            // console.log("THIS IS BEFORE THE FE$TCH: ", user_id)
            // console.log("THIS IS THE USER:", user)
            fetch(`/data`, {
                headers: {
                Authorization: `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(async data => {
                    console.log("DATA WHEN FETCH: ", data)
                    console.log("DATA WHEN FETCH: ", data.token)
                    console.log("DATA WHEN FETCH: ", data.user)
                window.localStorage.setItem("token", data.token)
                setToken(data.token)
                setUser(data.user);
                
                })
                .catch(error => {console.error('Error fetching user data:', error)})
            }
            else {
                console.log("NO TOKEN")
            }
        }, []);

    // Obtaining user_id for logged in user from token
        console.log("USER ID FROM USERACCOUNT COMPONENT: ", user._id)
    // Returns page with header component containing username and avatar based on logged-in user's user_id.
    if(token) {     
        return(
            <>
                <h2> {user.username}'s Account</h2>
                    <div id='user-account-page' role="main">
                        <Header user_id={ user._id } />
                    </div>
            </>
        )
    } else {
        navigate('/login')
    }
}

export default UserAccount;
