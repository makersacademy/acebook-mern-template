import React, { useEffect, useState } from "react";

const Header = ({ user_id, navigate }) => {
    const [user, setUser] = useState({});
    const [token, setToken] = useState(window.localStorage.getItem("token"));

    // Fetching user data from backend using user_id passed in prop
    console.log("USER_ID FROM FRONTEND:", user_id)
    useEffect(() => {
        if(token) {
            fetch(`/data/user`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ user_id : user_id}),
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
    
        if(token) {
            return (
                    <header>
                            <img width="100px" src={"../images/avatars/"+user.avatar} alt="User Avatar"></img>
                            <br/>
                            {user.username}
                    </header>
            )
        } 
        else {
        }
    }


export default Header;
