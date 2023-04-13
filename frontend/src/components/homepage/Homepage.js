import React, { useState } from 'react';

const Homepage = () => {
  return (
    <>
    <h1>Acebook</h1>
      <h2>Welcome Again!</h2>
      <a href="/login">log in</a>
      <br/>
      <h2>Don't have an account yet?</h2>
      <a href="/signup">sign up</a>
    </>
  )
}

export default Homepage;