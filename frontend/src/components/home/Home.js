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
        //   .then(response => {
        //     if(response.status === 201) {
        //       navigate('/login')
        //     } else {
        //       navigate('/signup')
        //     }
        //   })
      }
    
      const login = () => {
        navigate('/login')
      }

      const signup = () => {
        navigate ('/signup')
      }

  return (
      <div id="homePage">
      <div className="textWrap">
            <div className="heading">
              <img src="https://i.imgur.com/kjtUiie.png" className="home-img" alt="Acebook"></img>
            </div>
            <p className="catchline">The worst Facebook clone there ever was...</p>
        </div>
        <div className="formWrap">
          <form onSubmit={handleSubmit}>
            <button id="signup" type='text' className='signupButton' onClick={signup}>Sign Up</button>
            <button id="login" type='text' className='loginButton' onClick={login}>Log In</button>
          </form>
        </div>
      </div>
  );
}

export default HomePage;