import React from 'react';
import './Home.css';

const HomePage = ({navigate}) => {

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    fetch( '/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    // .then(response => {
    //   if(response.status === 201) {
    //     navigate('/login')
    //   } else {
    //     navigate('/signup')
    //   }
    // })
  }
  
  const login = () => {
    navigate('/login')
  }

  const signup = () => {
    navigate ('/signup')
  }

  return (
    <div id="home-page">
    <div className="hp-wrap">
      </div>
      <div className="hp-form-div">
      <div className="heading">
            <img src="https://i.imgur.com/kjtUiie.png" className="home-img" alt="Acebook"></img>
          </div>
          <p className="hp-text">Welcome to Facebook without the F</p>
        <form onSubmit={handleSubmit} className="hp-form">
          <button id="signup" type='text' className='sign-up-button' onClick={signup}>Sign Up</button>
          <h4 className="hp-haveanaccount">Already have an account? </h4><b className="hp-signin-text" onClick={login}>Sign in here</b>
        </form>
      </div>
    </div>
  );
}

export default HomePage;