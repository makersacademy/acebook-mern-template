import React, { useState } from 'react';
import '../photos/profile.png'

const SignUpForm = ({ navigate }) => {
  
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [image, setImage] = useState('https://www.shareicon.net/data/128x128/2016/11/28/857788_animal_512x512.png')


  const handleImageChange = (event) => {
    setImage(event.target.value)
  }

  const handleNameChange = (event) => {
    setName(event.target.value)
  }
  
  const handleAboutMeChange = (event) => {
    setAboutMe(event.target.value)
  }
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event) => {
    setError(null)
    event.preventDefault();

    const response = await fetch( '/users/signup', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name, email: email, password: password, aboutMe: aboutMe, friends: [], image: image })
    })
    const data = await response.json()
    if (response.status === 201) {
      navigate('/login')
      } else {
      setError(data.error)
      navigate('/signup')
    }
  }


    return (
      <form onSubmit={handleSubmit}>
        <input required placeholder='Name' id="name" type='text' value={ name } onChange={handleNameChange} />
        <input required placeholder='About me' id="aboutMe" type='text' value={ aboutMe } onChange={handleAboutMeChange} />
        <input placeholder="Email" id="email" type='text' value={ email } onChange={handleEmailChange} />
        <input placeholder="Password" id="password" type='password' value={ password } onChange={handlePasswordChange} />
        <input id='submit' type="submit" value="Submit" />
        {error && <div className="error">{error}</div>}
        <div> 
          <h5> Select a Profile Picture for your Profile </h5>
        <img src={'https://www.shareicon.net/data/128x128/2016/11/28/857788_animal_512x512.png'} alt = "profile" />
        <img src={'https://www.shareicon.net/data/128x128/2016/11/28/857792_animal_512x512.png'} alt = "profile" />
        <img src={'https://www.shareicon.net/data/128x128/2016/12/20/863853_snake_512x512.png'} alt = "profile" />
        <img src={'https://www.shareicon.net/data/128x128/2017/01/06/868266_bug_512x512.png'} alt = "profile" />
        
        {/* <button id="profile" onClick={handlePictureChange}> Select me </button> */}
        <select id="selectList" onChange={handleImageChange}>
          <option value='https://www.shareicon.net/data/128x128/2016/11/28/857788_animal_512x512.png'>Option 1</option>
          <option value='https://www.shareicon.net/data/128x128/2016/11/28/857792_animal_512x512.png'>Option 2</option>
          <option value='https://www.shareicon.net/data/128x128/2016/12/20/863853_snake_512x512.png'>Option 3</option>
          <option value='https://www.shareicon.net/data/128x128/2017/01/06/868266_bug_512x512.png'>Option 4</option>
      </select>
        
        </div>
      </form>

    );
}

export default SignUpForm;
