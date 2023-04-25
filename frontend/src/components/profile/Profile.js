import React, { useEffect, useState } from 'react';
import './Profile.css';

const Profile = ({ navigate }) => {
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const user_id = window.localStorage.getItem("user_id");
    const [firstName, setFirst] = useState("");
    const [lastName, setLast] = useState("");
    const [username, setUsername] = useState("");
    const [profilePic, setProfilePic] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault()
        
        if (profilePic === "") {
            let params = { id: user_id, firstName: firstName, lastName: lastName, username: username, profilePic: "https://res.cloudinary.com/dhocnl7tm/image/upload/v1682355179/hugk4xv9xqei28pwy4ay.png" }

            if (firstName === "") {
                delete params.firstName
            } else if (lastName === "") {
                delete params.lastName
            } else if (username === "") {
                delete params.username
            } 
            await fetch( '/users', {
                method: 'put',
                headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
                body: JSON.stringify(params)
            })  
            .then(res => res.json())
            .then(data => {
                setFirst(data.firstName)
                setLast(data.lastName)
                setUsername(data.username)
            })
        } else {
            const data = new FormData()   // << learn more about FormData / used to upload data
            data.append("file", profilePic)
            data.append("upload_preset", "acebook")
            data.append("cloud_name", "dhocnl7tm")
            await fetch("https://api.cloudinary.com/v1_1/dhocnl7tm/image/upload", {
                method: "post",
                body: data
            })
            .then(res => res.json())
            .then(data => {
                fetch( '/users', {
                    method: 'put',
                    headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: user_id, firstName: firstName, lastName: lastName, username: username, profilePic: data.url})
            })
            })      
            .then(res => res.json())
            .then(data => {
                setFirst(data.firstName)
                setLast(data.lastName)
                setUsername(data.username)
                setProfilePic(data.profilePic)
            })
        }
    }

    return (
        <div id="pf-page">
            <div className="pf-wrap">
                <div className="heading">
                    {/* <img src={pic} className="home-img" alt="Acebook"></img> */}
                    <p>{username}</p>
                    <p>{firstName}</p>
                    <p>{lastName}</p>
                </div>
                <p className="pf-text">Edit your profile:</p>
            </div>
            <div className="pf-form-div">
                <form onSubmit={handleSubmit} className="pf-form">
                    <input placeholder="First Name" id="firstName" className='text-entry' type='text' value={ firstName } onChange={(e) => setFirst(e.target.value)} />
                    <input placeholder="Last Name" id="secondName" className='text-entry' type='text' value={ lastName } onChange={(e) => setLast(e.target.value)} />
                    <input placeholder="Username" id="username" className='text-entry' type='text' value={ username } onChange={(e) => setUsername(e.target.value)} />
                    <br></br>
                    <label className="custom-file-upload">
                    <input type="file" accept="image/png, image/jpeg" id="chooseImg" onInput={(e) => setProfilePic(e.target.files[0])}></input>
                        Upload Profile Picture
                    </label>
                    <input id='submit' type="submit" className="signupButton" value="Update Profile" />
                </form>
            </div>
        </div>
    );
}

export default Profile;