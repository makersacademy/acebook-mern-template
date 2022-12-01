import React, { useEffect, useState } from "react";

const Home = ({navigate}) => {

  const handleLogin = async (event) => {
    event.preventDefault();

    fetch( '/', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: "OK" })
    })
      .then(response => {
        if(response.status === 201) {
          navigate('./login')
        } else {
          navigate('./')
        }
      })
  }



  
  return (
    <>
    <div>
      <h1>Hello there!</h1>
    </div>
    <div>
        <body onSubmit={handleLogin}>
            <p>Select below where you'd like to go</p>
            <a href="/login"><button>Login</button></a>
            <a href="/signup"><button>Sign up</button></a>
        </body>
    </div>
    </>
  );
}



export default Home;
