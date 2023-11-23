import React, { useEffect, useState } from "react";

const Header = ({ user_id, navigate }) => {
    const [user, setUser] = useState({});
    const [token, setToken] = useState(window.localStorage.getItem("token"));

    // Fetching user data from backend using user_id passed in prop

    useEffect(() => {
        if(token) {
            fetch(`/data/${user_id}`, {
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
            navigate('/../login')
        }
    }


export default Header;
