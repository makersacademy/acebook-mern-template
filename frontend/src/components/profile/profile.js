import React, { useEffect, useState } from 'react'
import profile_placeholder from './profile_placeholder.jpeg';
import Card from '../Helpers/Card.js';
import './profile.css';
import Feed from '../feed/Feed'
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { id } = useParams();
  const [token, setToken] = useState(window.localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      fetch('/users/' + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          window.localStorage.setItem('token', data.token);
          setToken(window.localStorage.getItem('token'));
        });
    }
    // eslint-disable-next-line
  }, []);

return(
  <div>
    <div className='coverPhoto'>
      <Card>
      </Card>

    </div>
    <div className='container'>
      <div className='left'>
        <div className='user-info'>
          <Card>
            <img src={profile_placeholder} style={{width: "50px", height: "50px"}} />
            <h1>Username</h1>
            <div className="user-details">
              <p>Hometown</p>
              <p>Profession</p>
              <p>Relationship Status</p>
            </div>
          </Card>
        </div>

        <div className='intro'>
          <Card>
            <h3>Intro</h3>
            <p>Bio</p>
          </Card>
        </div>

        <div className='photos'>
          <Card>
            <div className='photo'>
              <Card>
                <img src={profile_placeholder} style={{width: "50px", height: "50px"}} />
              </Card>
            </div>
            <div className='photo'>
              <Card>
                <img src={profile_placeholder} style={{width: "50px", height: "50px"}} />
              </Card>
            </div>
            <div className='photo'>
              <Card>
                <img src={profile_placeholder} style={{width: "50px", height: "50px"}} />
              </Card>
            </div>
            <div className='photo'>
              <Card>
                <img src={profile_placeholder} style={{width: "50px", height: "50px"}} />
              </Card>
            </div>
          </Card>
        </div>
      </div>

      
      <div className='right'>
        <div className='edit-button'>
          <button>Edit profile</button>
        </div>

        <div className='posts'>
          <Card>
            <Feed />
          </Card>
        </div>
      </div>  
    </div>
  </div>
 )
}

export default Profile