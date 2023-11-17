import React, { useState } from 'react';

const LogInForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch( '/tokens', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
// <<<<<<< HEAD
      body: JSON.stringify({ email: email, password: password })
    });
    if (response.status === 201) {
      // GOOD NEWS.
      console.log("token");
      let data = await response.json();
      window.localStorage.setItem("token", data.token);
      navigate('/posts');
    } else {
      // BAD NEWS.
      navigate('/login');
    }

//       body: JSON.stringify({ displayName: displayName, email: email, password: password })
//     })
//       .then(async response => {
//         if(response.status === 201) {
//           // GOOD NEWS.
//           console.log("token");
//           let data = await response.json();
//           console.log(data);
//           window.localStorage.setItem("token", data.token);
//           navigate('/posts');
//         } else {
//           // BAD NEWS.
//           navigate('/login');
//         }
//       })
//   }

//   const handleDisplayNameChange = (event) => {
//     setDisplayName(event.target.value)
// >>>>>>> 1532bdb (I added comments)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }


    return (
      <form onSubmit={handleSubmit}>
        <input placeholder='Email' id="email" type='text' value={ email } onChange={handleEmailChange} />
        <input placeholder='Password' id="password" type='password' value={ password } onChange={handlePasswordChange} />
        <input role='submit-button' id='submit' type="submit" value="Submit" />
      </form>
    );
}

export default LogInForm;
