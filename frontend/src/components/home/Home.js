import React, { useEffect, useState } from "react";

const Home = ({navigate}) => {    
  return (
    <>
    <div>
      <h1>Hello there!</h1>
    </div>
    <div>
        <body>
            <p>Select below where you'd like to go</p>
            <a href="/login"><button>Login</button></a>
            <a href="/signup"><button>Sign up</button></a>
        </body>
    </div>
    </>
  );
}



export default Home;
