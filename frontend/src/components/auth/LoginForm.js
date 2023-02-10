import React, { useState } from 'react';

const LogInForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch( '/tokens', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password })
    })

    if(response.status !== 201) {
      setError("Incorrect login details, try again....");
      return
    } else {
      let data = await response.json()
      window.localStorage.setItem("token", data.token)
      window.localStorage.setItem("email", email)
      navigate('/posts');
    }
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }



  return (
    <div className="logInForm">
      <br></br>
    <nav className="nav">
      
        <a href="/posts" className="site-title">
            Acebook
        </a>
        <ul>
            <li>
                <a href="/signup"> Signup </a>
            </li>
        </ul>
   </nav>
{/* )

return ( */}
        <b>
          
        </b>
      <form onSubmit={handleSubmit}>
      <div></div><br />
        <input placeholder='Email' id="email" type='text' value={ email } onChange={handleEmailChange} />
        <div></div><br />
        <input placeholder='Password' id="password" type='password' value={ password } onChange={handlePasswordChange} />
        <div></div><br />
        <input role='submit-button' id='submit' type="submit" value="Submit" />
      </form>
    </div>

    );
}

export default LogInForm;
