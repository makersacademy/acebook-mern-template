import React from 'react'
import profile_placeholder from './profile_placeholder.jpeg';
import Card from '../Helpers/Card.js';
import './profile.css';

const Profile = () => {

return(
  <div className='container'>
    <div>
      <Card>
        <img src={profile_placeholder} style={{width: "50px", height: "50px"}} />
        <h1>Username</h1>
      </Card>
    </div>
    <div>
      <button>Edit profile</button>
    </div>
  </div>
)

}

export default Profile