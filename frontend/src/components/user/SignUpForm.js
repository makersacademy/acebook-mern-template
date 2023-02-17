import React, { useState } from 'react';

const SignUpForm = ({ navigate }) => {

  // React hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const handleSubmit = async (event) => {
    event.preventDefault();

    // api call - post sending body of email, password, firstname, lastname
    fetch( '/users', {
      method: 'post',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      // this is what is sent to the backend
      body: JSON.stringify({ email: email, password: password, firstName: firstName, lastName: lastName })
    })
      .then(response => {
        if(response.status === 201) {
          navigate('/login')
        } else {
          navigate('/signup')
        }
      })
  }

  // functions to change the value of documents in mongo
  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value)
  }

  const handleLastNameChange = (event) => {
    setLastName(event.target.value)
  }
  
return (
    <div>
    <nav className="nav">
        <a href="/posts" className="site-title">
            acebook
        </a>
        <ul>
             <a class="login-button" href="/login"> Login </a>
        </ul>
   </nav>

  
      <div className="signUpForm">
        <div class='bold-line'></div>
        
<div class='container'>
  <div class='window'>
    <div id="signup-overlay" class='overlay'></div>
    <div class='content'>
      <div class='welcome-signup'>Hello there!</div>
      <div class='subb-signup'>Welcome to Acebook</div>
      <div class='subtitle-signup'>Please signup below</div>
      <form onSubmit={handleSubmit}>
      <div class='input-fields-signup'>
      
        <input type='text' placeholder='First Name' class='input-line full-width' value={ firstName } onChange={handleFirstNameChange}></input>
        <input type='text' placeholder='Last name' class='input-line full-width' value={ lastName } onChange={handleLastNameChange}></input>
        <input type='email' placeholder='Email' class='input-line full-width' value={ email } onChange={handleEmailChange}></input>
        <input type='password' placeholder='Password' class='input-line full-width' value={ password } onChange={handlePasswordChange}></input>
      </div>
      <div><button class='ghost-round full-width' type="submit" id ='signup-submit' value="Submit" >Create Account!</button></div>
      </form>
    </div>
    
  </div>
  
  
</div>

      </div>
      
      </div>
      
    );
}
console.log(SignUpForm)
export default SignUpForm;