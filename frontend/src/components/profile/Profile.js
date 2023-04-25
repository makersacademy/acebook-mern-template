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
                method: 'post',
                headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstName: firstName, lastName: lastName, username: username, profilePic: profilePic  })
        })
        console.log(data.url)
        })      
        .then(response => {
            if(response.status === 201) {
                navigate('/posts')
            } else {
                navigate('/posts')
            }
        })
    }

    return (
        <div id="homePage">
            <div className="textWrap">
                <div className="heading">
                    <img src={user_id} className="home-img" alt="Acebook"></img>
                </div>
                <p className="catchline">Make your profile yours by adding some details...</p>
            </div>
            <div className="formWrap">
                <form onSubmit={handleSubmit}>
                    <input placeholder="First Name" id="firstName" className='textEntry' type='text' value={ firstName } onChange={(e) => setFirst(e.target.value)} />
                    <input placeholder="Last Name" id="secondName" className='textEntry' type='text' value={ lastName } onChange={(e) => setLast(e.target.value)} />
                    <input placeholder="Username" id="username" className='textEntry' type='text' value={ username } onChange={(e) => setUsername(e.target.value)} />
                    <label className="custom-file-upload">
                    <input type="file" id="chooseImg" onInput={(e) => setProfilePic(e.target.files[0])}></input>
                        Upload Profile Picture
                    </label>
                    <input id='submit' type="submit" className="signupButton" value="Updata Profile" />
                </form>
            </div>
        </div>
    );
}

export default Profile;