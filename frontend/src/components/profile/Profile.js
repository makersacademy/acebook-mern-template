import React, { useEffect, useState } from 'react';
import './Profile.css';

const Profile = ({ navigate }) => {
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const user = JSON.parse(window.localStorage.getItem("user"));
    const [firstName, setFirst] = useState(user.firstName);
    const [lastName, setLast] = useState(user.lastName);
    const [username, setUsername] = useState(user.username);
    const [profilePic, setProfilePic] = useState("");
    const [rerender, setRerender] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault()
        
        if (!firstName || !lastName || !username) {
            console.log("enter all fields bla bla bla")
        } else {
            if (!profilePic) {
                let params = { 
                    _id: user._id, 
                    email: user.email, 
                    firstName: firstName, 
                    lastName: lastName, 
                    username: username, 
                    profilePic: user.profilePic 
                }
                fetch( '/users', {
                    method: 'put',
                    headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                    body: JSON.stringify(params)
                })  
                .then(res => res.json())
                .then(data => {
                    window.localStorage.removeItem("user")
                    const user = {_id: data._id, email: data.email, username: data.username, firstName: data.firstName, lastName: data.lastName, profilePic: data.profilePic}
                    window.localStorage.setItem("user", JSON.stringify(user))
                    setRerender(!rerender);
                })
            } else {
                const data = new FormData()   // << learn more about FormData / used to upload data
                data.append("file", profilePic)
                data.append("upload_preset", "acebook")
                data.append("cloud_name", "dhocnl7tm")
                fetch("https://api.cloudinary.com/v1_1/dhocnl7tm/image/upload", {
                    method: "post",
                    body: data
                })
                .then(res => res.json())
                .then(data => {
                    let params = { 
                        _id: user._id, 
                        email: user.email, 
                        firstName: firstName, 
                        lastName: lastName, 
                        username: username, 
                        profilePic: data.url
                    }                    
                    fetch( '/users', {
                        method: 'put',
                        headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(params)
                    })
                    .then(res => res.json())
                    .then(data => {
                        window.localStorage.removeItem("user")
                        const user = {_id: data._id, email: data.email, username: data.username, firstName: data.firstName, lastName: data.lastName, profilePic: data.profilePic}
                        window.localStorage.setItem("user", JSON.stringify(user))
                        setRerender(!rerender);
                    })
                })  
            }
        }
        
    }
    return (
        <div id="pf-page">
            <div className="pf-card">
                <div className="pf-card-items">
                    <b className="pf-username">Username</b>
                    <div className="pf-name-div"><b className="pf-card-text">{user.username}</b></div>
                    <br></br>
                    <img src={user.profilePic} className="profile-pic-icon" alt="Profile"></img>
                    <br></br>
                    <br></br>
                    <b className="pf-your-name">Name:</b>
                    <div className="pf-name-div"><b className="pf-name">{user.firstName} {user.lastName}</b></div>
                </div>
            </div>
            <div className="pf-form-div">
                <form onSubmit={handleSubmit} className="pf-form">
                    <p className="pf-text">Edit your profile:</p>
                    <div className="first-name"><input placeholder="First name" id="firstName" className='firstname-txt' type='text' value={ firstName } onChange={(e) => setFirst(e.target.value)} /></div>
                    <div className="last-name"><input placeholder="Last name" id="lastName" className='lastname-txt' type='text' value={ lastName } onChange={(e) => setLast(e.target.value)} /></div>
                    <br></br>
                    <br></br>
                    <input placeholder="Username" id="username" className='un-text' type='text' value={ username } onChange={(e) => setUsername(e.target.value)} />
                    {/* Add password change */}
                    <br></br>
                    <br></br>
                    <label className="upload-button">
                    <input type="file" accept="image/png, image/jpeg" id="chooseImg" onChange={(e) => setProfilePic(e.target.files[0])}></input>
                        Upload Profile Picture
                    </label>
                    <br></br>
                    <br></br>
                    <button id="submit-btn" type='text' className='update-btn' onClick={handleSubmit}>Submit Changes</button>
                </form>
            </div>
        </div>
    );
}

export default Profile;