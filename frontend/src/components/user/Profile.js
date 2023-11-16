import React, { useEffect, useState } from 'react';



const Profile = ({user, navigate}) => {
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    useEffect(() => {
        if (token) { 
        return(
            <div> 
                <h1> My Profile </h1>
                {/* <article data-cy="profile" key={ user._id }>{ user.email }</article> */}
                <p></p>
            </div>
        )}
        else {
            navigate('/login')
        }
    }) 
}

export default Profile;
