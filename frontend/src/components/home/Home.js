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
    <body>
      <div id="homePage">
      <div class="textWrap">
            <div class="heading">
              <img src="https://i.imgur.com/kjtUiie.png" class="home-img" alt="Acebook"></img>
            </div>
            <p class="catchline">The worst Facebook clone there ever was...</p>
        </div>
        <div class="formWrap">
          <form onSubmit={handleSubmit}>
            <button id="signup" type='text' class='signupButton' onClick={signup}>Sign Up</button>
            <button id="login" type='text' class='loginButton' onClick={login}>Log In</button>
          </form>
        </div>
      </div>
    </body>
  );
}

export default HomePage;