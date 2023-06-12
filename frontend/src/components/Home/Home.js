import React from 'react';
import './Home.css'
import '../user/SignUpForm.css'

const Home = ({ navigate }) => {

  const signUpNav = () => {
    navigate('/signup')
  }

  const logInNav = () => {
    navigate('/login')
  }

  return(
    <>
    <div className='homepage'>
        
        <div className='titles'>
          <h1>Welcome to The Shire!</h1><br/>
        </div>
      
        <div className='buttons'>
          <button className='inputButton' onClick={logInNav}>
            Log-In
          </button>
          <button className='inputButton' onClick={signUpNav}>
            Sign-Up
          </button>
        </div>
    </div>
    </>
  );
}

export default Home;