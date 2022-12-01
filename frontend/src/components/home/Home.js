import React, { useEffect, useState } from "react";

const Home = () => {
  return (
    <>
    <div>
      <h1>Hello there!</h1>
    </div>
    <div>
        <form>
            <p>Select below where you'd like to go</p>
            <button>Login</button>
            <button>Sign up</button>
        </form>
    </div>
    </>
  );
};

/*
const welcome_field = ("Welcome")

const Home = ({ navigate }) => {
    render( '/',
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
        body: ({ welcome_field: welcome_field })
        if(response => {
            if (response.status === 200) {
                navigate('/')
            } else {
                return "This hasn't worked"
            }
        })
}
*/
export default Home;
