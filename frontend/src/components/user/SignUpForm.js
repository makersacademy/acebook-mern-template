import React, { useEffect, useState } from 'react';

const SignUpForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token] = useState(window.localStorage.getItem("token"));
  let [errorMsg, setError] = useState("");

  useEffect(() => {
    if(token) {
      navigate('/posts')
    }
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch( '/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password })
    })
      .then(response => {
        if(response.status === 201) {
          navigate('/login')
        } else {
          setError("Email already taken")
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


    return (
      <>
        <form onSubmit={handleSubmit}>
            <input placeholder="Email" id="email" type='text' value={ email } onChange={handleEmailChange} />
            <input placeholder="Password" id="password" type='password' value={ password } onChange={handlePasswordChange} />
          <input id='submit' type="submit" value="Submit" />
        </form>
        <p>{errorMsg}</p>
      </>
    );
}

export default SignUpForm;
