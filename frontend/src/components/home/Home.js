import React from 'react';

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
        <form onSubmit={handleSubmit}>
        <button id="signup" type='text' onClick={signup}>Sign Up</button>
        <button id="login" type='text' onClick={login}>Log In</button>
    </form>
  );
}


export default HomePage;