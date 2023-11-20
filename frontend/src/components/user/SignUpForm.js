import React, { useState } from 'react';


const SignUpForm = ({ navigate }) => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emptyFieldsError, setEmptyFieldsError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);

  

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!firstName || !lastName || !email || !password || !retypePassword) {
      setErrorMessage("All fields must be filled"); 
      return;
    } else {
      setEmptyFieldsError("");
    } 

    if (!isValidPassword(password)) {
      setErrorMessage("Password must be 8 characters or more, contain a special character, and have at least 1 number");
      return;
    } else {
      setErrorMessage("");
    }

    if (password !== retypePassword) {
      setErrorMessage("Passwords do not match");
      return;
    } else {
      setErrorMessage("");
    }


    const hashedPassword = password;

    fetch( 'api/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, email, password: hashedPassword, retypePassword })
    })
      .then(response => {
        if(response.status === 201) {
          navigate('/login');
        } else if (response.status === 400) {
          return response.json();
        } else {
          navigate('/signup')
        }
      })
      .then(data => {
        if (data && data.message === 'Email is already in use') {
          setErrorMessage('Email is already registered');
        } else {
          setErrorMessage('');
        }
      });
  };


  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value)
  }

  const handleLastNameChange = (event) => {
    setLastName(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleRetypePasswordChange = (event) => {
    setRetypePassword(event.target.value)
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const toggleShowRetypePassword = () => {
    setShowRetypePassword(!showRetypePassword);
  };

    return (
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2> 
          <input placeholder="First Name" id="First Name" type='text' value={ firstName } onChange={handleFirstNameChange} />
          <input placeholder="Last Name" id="Last Name" type='text' value={ lastName } onChange={handleLastNameChange} />
          <input placeholder="Email" id="Email" type='text' value={ email } onChange={handleEmailChange} />
          
        <div className="password-input-container">
          <input placeholder="Password" id="password" type={showPassword ? 'text' : 'password'} value={ password } onChange={handlePasswordChange} />
          
          <button type="button" onClick={toggleShowPassword} className="toggle-password-button">
          {showPassword ? '🙈' : '👀'} 
          </button>
        </div>

        <div className="password-input-container">
          <input placeholder="Retype Password" id="retypePassword" type={showRetypePassword ? 'text' : 'password'} value={ retypePassword } onChange={handleRetypePasswordChange} />
          
          <button type="button" onClick={toggleShowRetypePassword} className="toggle-password-button">
        {showRetypePassword ? '🙈' : '👀'}
      </button>
    </div>
          <input role='submit' id='submit' className='primary-btn' type="submit" value="Sign Up" />
          {emptyFieldsError && <p style={{ color: 'red' }}>{emptyFieldsError}</p>}
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <p>Already have an account? <a href="/Login">Login</a></p>
      </form>
    );
}

function isValidPassword(password) {
  // Password must be 8 characters or more, contain a special character, and have at least 1 number
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
  return passwordRegex.test(password);
}

export default SignUpForm;
