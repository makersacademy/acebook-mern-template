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
            Acebook
        </a>
        <ul>
            <li>
                <a href="/login"> Login </a>
            </li>
        </ul>
   </nav>

  

    {/* // returning of jsx, this is what shows on the page
    return ( */}
      <div className="signUpForm">
        <h1>Sign Up</h1>
          
            {/* <div>
              <div>Email</div><br />
              <input placeholder="eg j.smith@email.com" id="email" type='text' value={ email } onChange={handleEmailChange} />
            </div>
            <br />
            <div>
              <div>Password</div><br />
              <input placeholder="eg securepassword" id="password" type='password' value={ password } onChange={handlePasswordChange} />
            </div>
            <br />
            <div>
              <div>First Name</div><br /> 
              <input placeholder="eg John" id="firstName" type='firstName' value={ firstName } onChange={handleFirstNameChange} />
            </div>
            <br />
            <div>
              <div>Last Name</div><br />
              <input placeholder="eg Smith" id="lastName" type='lastName' value={ lastName } onChange={handleLastNameChange} />
            </div>
            <br />
          <input id='submit' type="submit" value="Submit" /> */}
        {/* </form> */}
        <div class='bold-line'></div>
        
<div class='container'>
  <div class='window'>
    <div class='overlay'></div>
    <div class='content'>
      <div class='welcome'>Hello There!</div>
      <div class='subb'>Welcome to Acebook:</div>
      <div class='subtitle'>We're almost done. Before using our services you need to create an account.</div>
      <form onSubmit={handleSubmit}>
      <div class='input-fields'>
      
        <input type='text' placeholder='First Name' class='input-line full-width' value={ firstName } onChange={handleFirstNameChange}></input>
        <input type='text' placeholder='Last name' class='input-line full-width' value={ lastName } onChange={handleLastNameChange}></input>
        <input type='email' placeholder='Email' class='input-line full-width' value={ email } onChange={handleEmailChange}></input>
        <input type='password' placeholder='Password' class='input-line full-width' value={ password } onChange={handlePasswordChange}></input>
      </div>
      <div><button class='ghost-round full-width' type="submit" id ='submit' value="Submit" >Create Account!</button></div>
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
