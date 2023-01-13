import React from 'react'
import profile_placeholder from './profile_placeholder.jpeg';
import Card from '../Helpers/Card.js';
import './profile.css';
import Feed from '../feed/Feed'

const Profile = () => {

return(
  <div>
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
    <div className='container'>
      <div className='posts'>
        <Card>
          <Feed />
        </Card>
      </div>
    </div>
  </div>

)

}

export default Profile