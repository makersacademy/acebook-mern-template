import React, { useState } from 'react';

const SignUpForm = ({ navigate }) => {

  // React hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // api call - post sending body of email, password, firstname, lastname
    fetch( '/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      // this is what is sent to the backend
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

  // functions to change the value of documents in mongo
  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value)
  }

  const handleLastNameChange = (event) => {
    setLastName(event.target.value)
  }

    // returning of jsx, this is what shows on the page
    return (
      <div className="signUpForm">
        <h1>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <div>Email</div><br />
              <input placeholder="eg j.smith@email.com" id="email" type='text' value={ email } onChange={handleEmailChange} />
            </div>
            <br />
            <div>
              <div>Password</div><br />
              <input placeholder="eg securepassword" id="password" type='password' value={ password } onChange={handlePasswordChange} />
            </div>
            <br />
            <div>
              <div>First Name</div><br /> 
              <input placeholder="eg John" id="firstName" type='firstName' value={ firstName } onChange={handleFirstNameChange} />
            </div>
            <br />
            <div>
              <div>Last Name</div><br />
              <input placeholder="eg Smith" id="lastName" type='lastName' value={ lastName } onChange={handleLastNameChange} />
            </div>
            <br />
          <input id='submit' type="submit" value="Submit" />
        </form>
      </div>
    );
}

export default SignUpForm;

