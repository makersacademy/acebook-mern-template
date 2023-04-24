import React, { useState } from 'react';
import './Profile.css'

const Profile = ({ navigate }) => {

//   const [firstName, setFirst] = useState("");
//   const [lastName, setLast] = useState("");
//   const [username, setUsername] = useState("");
//   const [profilePic, setProfilePic] = useState("");

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     fetch( '/users', {
//       method: 'post',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ firstName: firstName, lastName: lastName, username: username, profilePic: profilePic })
//     })
//       .then(response => {
//         if(response.status === 201) {
//           navigate('/posts')
//         } else {
//           navigate('/signup')
//         }
//       })
//   }

//     return (
//       <div id="homePage">
//         <div className="textWrap">
//           <div className="heading">
//             <img src="https://i.imgur.com/kjtUiie.png" className="home-img" alt="Acebook"></img>
//           </div>
//             <p className="catchline">Make your profile yours by adding some details...</p>
//           </div>
//           <div className="formWrap">
//             <form onSubmit={handleSubmit}>
//               <input placeholder="First Name" id="firstName" className='textEntry' type='text' value={ firstName } onChange={(e) => setFirst(e.target.value)} />
//               <input placeholder="Last Name" id="secondName" className='textEntry' type='text' value={ lastName } onChange={(e) => setLast(e.target.value)} />
//               <input placeholder="Username" id="username" className='textEntry' type='text' value={ username } onChange={(e) => setUsername(e.target.value)} />
//               <input id='submit' type="submit" className="signupButton" value="Save Profile" />
//             </form>
//           </div>
//         </div>
//     );
}

export default Profile;