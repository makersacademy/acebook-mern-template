import React, { useState } from 'react';

const SignUpForm = ({ navigate }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch( '/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password, firstName: firstName, lastName: lastName })
    })
      .then(response => {
        if(response.status === 201) {
          navigate('/login')
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

  const handlefirstNameChange = (event) => {
    setfirstName(event.target.value);
  }

  const handlelastNameChange = (event) => {
    setlastName(event.target.value);
  }


    return (
      <form onSubmit={handleSubmit} className="container">
      <div className ="mb-3">
          <label for="email" className="form-label">Email address</label>
          <input placeholder="Email" id="email" type='text' value={ email } onChange={handleEmailChange} className="form-control" />
      </div>
      <div className ="mb-3">
        <label for="password" className="form-label">Password</label>
        <input placeholder="Password" id="password" type='password' value={ password } onChange={handlePasswordChange} className="form-control" />
      </div>
      <div className ="mb-3">
        <label for="firstName" className="form-label">First Name</label>
        <input placeholder="First Name" id="firstName" type='text' value={ firstName } onChange={handlefirstNameChange} className="form-control" />
      </div>
      <div className ="mb-3">
        <label for="lastName" className="form-label">Last Name</label>
        <input placeholder="Last Name" id="lastName" type='text' value={ lastName } onChange={handlelastNameChange} className="form-control" />
      </div>
        <input id='submit' type="submit" value="Submit" className="btn btn-primary" />
      </form>
    );
}

export default SignUpForm;
