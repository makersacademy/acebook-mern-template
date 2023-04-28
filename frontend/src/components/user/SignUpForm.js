import React, { useState } from 'react';
import './SignUpForm.css';
import M from 'materialize-css'
import '../../toasts/toast.css'

const SignUpForm = ({ navigate }) => {
  const [username, setUsername] = useState("")
  const [firstName, setFirst] = useState("")
  const [lastName, setLast] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    let status = null
    fetch( '/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password, username: username, firstName: firstName, lastName: lastName })
    })
      .then(res => {
        status = res.status
        return res.json()
      })
      .then(data => {
        if (status !== 201) {
          M.toast({html: data.message, classes: "rounded"})
        } else {
          M.toast({html: data.message, classes: "rounded"})
          navigate('/login')
        }
      })
  }

  return (
    <div id="su-page">
      <div className="su-wrap">
        <div className="heading">
          <img src="https://i.imgur.com/kjtUiie.png" className="home-img" alt="Acebook"></img>
        </div>
          <p className="su-text">Please enter your details to sign up!</p>
        </div>
        <div className="su-form-div">
          <form onSubmit={handleSubmit} className="su-form">
          <div className='back-btn'>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid, no-script-url, jsx-a11y/alt-text */}
          <a href="javascript:window.history.back();"><img className="back-img" src="https://imgur.com/rHa4WHk.png"></img></a>
          </div>
            <input placeholder="Username" id="username" className='un-text' type='text' value={ username } onChange={(e) => setUsername(e.target.value)} />
            <br></br>
            <div className="first-name"><input placeholder="First Name" id="firstName" className='firstname-txt' type='text' value={ firstName } onChange={(e) => setFirst(e.target.value)} /></div>
            <div className="last-name"><input placeholder="Last Name" id="lastName" className='lastname-txt' type='text' value={ lastName } onChange={(e) => setLast(e.target.value)} /></div>
            <br></br>
            <input placeholder="Email" id="email" className='email-text' type='text' value={ email } onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Password" id="password" className='pw-text' type='password' value={ password } onChange={(e) => setPassword(e.target.value)} />
            <br></br>
            <br></br>
            <button id="signup" type='text' className='sign-up-button-2' onClick={handleSubmit}>Sign Up</button>
          </form>
        </div>
      </div>
  );
}

export default SignUpForm;
