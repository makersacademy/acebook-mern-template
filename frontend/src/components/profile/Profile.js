import * as React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import '../profile/Profile.css'

const Profile = ({ navigate }) => {
  const [user, setUser] = React.useState()
  const { id } = useParams()

useEffect(() => {
  getUserDetails()
}, [])


  const getUserDetails = async () => {
    const response = await fetch(`/users/userInfo/${id}`);
    const json = await response.json();
  

    if(response.ok) {
      console.log(response)
      setUser(json);
    }
  }
  

    return (
 
      <> {user ?
        <>
        <div class="profilePageContainer">
          <div className="coverPhoto">
            <img src='https://imgs.search.brave.com/XT32cL86aY7QsOrILFoIOljv2nwTY28KRAsAm1rn2o0/rs:fit:800:400:1/g:ce/aHR0cHM6Ly93d3cu/YjNtdWx0aW1lZGlh/LmllL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDE5LzA1L2dyYWRp/ZW50LXlvc2VtaXRl/LmpwZw'></img>
          </div>
          <div className="userProfileDetails">
            <div className='innerProfile'>
              <div className='profilePicture'>
                <img src='https://www.nareb.com/site-files/uploads/2017/03/fg-avatar-anonymous-user-retina.png'></img>
              </div>
              <div className='userFullName'>
                <h2>{user.user.firstName} {user.user.lastName}</h2>
              </div>
              <div className='friendCount'>
                <h5>551 Friends</h5>
              </div>
              <div className='buttonContainer'>
                <div className='btn btn-outline-primary'>
                  <a>Edit Profile</a>
                </div>
              </div>
            </div>
            <div id="profilePageBreak" className="lineBreak"></div>
            <nav id="profileNavBar" class="navbar navbar-expand-lg navbar-light">
              <a class="navbar-brand" href="#">Posts ▾</a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                  <li class="nav-item active">
                    <a class="nav-link" href="#">About<span class="sr-only"></span></a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">Friends</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">Photos</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">Videos</a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
        <div id="feedContainer " className='container'>
          <div className='feed'>
          </div>
        </div>
        </>

        :

        <h1>Can't find user</h1>
      }  
      </>
    )

}

export default Profile