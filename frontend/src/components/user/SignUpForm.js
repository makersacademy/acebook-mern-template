import React, { useState } from 'react';
import "./signUpForm.css";
import Footer from '../footer/footer'

const SignUpForm = ({ navigate }) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch( '/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name, email: email, password: password })
    })
      .then(response => {
        if(response.status === 201) {
          navigate('/')
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

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

    return (
      <div className='register-background'>
        
        <h1 className='register-logo'>spybook &#129464;</h1>
        
        <p className='register-login'> Already have an account? <a href="/" >Log in</a> </p> 
        
        <h1 className='register-quote'>Join the world's greatest superheroes today</h1>

        <div className = "register-box">
          <form onSubmit={handleSubmit}>
              <input placeholder="Full Name" type='text' value={ name } onChange={handleNameChange} />
              <input placeholder="Email address" type='text' value={ email } onChange={handleEmailChange} />
              <input placeholder="Password" type='password' value={ password } onChange={handlePasswordChange} />
              <button type="submit">Sign Up</button>
          </form>
        </div>
        <Footer/>    
      </div>
    );   
}
export default SignUpForm;