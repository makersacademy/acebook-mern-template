import React, { useState } from 'react';
import '../user/SignUpForm.css'

const SignUpForm = ({ navigate }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch('/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password, firstName: firstName, lastName: lastName })
    })
      .then(response => {
        if (response.status === 201) {
          navigate('/login')
        } else {
          navigate('/signup')
        }
      })
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handlefirstNameChange = (event) => {
    setfirstName(event.target.value);
  }

  const handlelastNameChange = (event) => {
    setlastName(event.target.value);
  }


  return (
    <>
    <img className='animatedImage1' src='https://app.svgator.com/assets/svgator.webapp/log-in-girl.svg'></img>
    <iframe className='animatedImage2' src="https://cdn.svgator.com/images/2022/09/animated-man-floating.svg"></iframe>
    <form onSubmit={handleSubmit} className="signupContainer">
      <div className='headerText'>
        <h1>Create a new account</h1>
        <h5>It's quick and easy</h5>
        <div className="lineBreak"></div>
      </div>
      <div id='emailTextbox' className="mb-4">
        <input placeholder="Email Address" data-cy="emailSignup" id="email" type='text' value={email} onChange={handleEmailChange} className="form-control" />
      </div>
      <div id='passwordTextbox' className="mb-4">
        <input placeholder="Password" data-cy="passwordSignup" id="password" type='password' value={password} onChange={handlePasswordChange} className="form-control" />
      </div>
      <div id='firstNameTextbox' className="mb-4">
        <input placeholder="First Name" data-cy="fnSignup" id="firstName" type='text' value={firstName} onChange={handlefirstNameChange} className="form-control" />
      </div>
      <div id='lastNameTextbox' className="mb-4">
        <input placeholder="Last Name" data-cy="lnSignup" id="lastName" type='text' value={lastName} onChange={handlelastNameChange} className="form-control" />
      </div>
      <input id='loginButton' data-cy="signupButton"  type="submit" value="Sign Up" className="btn btn-primary" />
      <div className='alreadyHaveAccountLink'>
        <a href="/login">Already have an account?</a>
      </div>
    </form>
    </>
  );
}
 
export default SignUpForm;
