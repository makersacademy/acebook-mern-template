import React, { useState } from 'react';

const SignUpForm = ({ navigate }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    <div>
    <nav className="nav">
        <a href="/posts" className="site-title">
            Acebook
        </a>
        <ul>
            <li>
                <a href="/login"> Login </a>
            </li>
        </ul>
   </nav>

      
      <form onSubmit={handleSubmit}>
          <input placeholder="Email" id="email" type='text' value={ email } onChange={handleEmailChange} />
          <input placeholder="Password" id="password" type='password' value={ password } onChange={handlePasswordChange} />
        <input id='submit' type="submit" value="Submit" />
      </form>
      </div>
    );
}
console.log(SignUpForm)
export default SignUpForm;

//   We asked chatgpt to have a look and see if we did anything wrong and it sent back this which is almost exactly the same
//   return (
//     <div>
//       <nav className="nav">
//         <a href="/posts" className="site-title">
//           Acebook
//         </a>
//         <ul>
//           <li>
//             <a href="/login"> Login </a>
//           </li>
//         </ul>
//       </nav>

//       <form onSubmit={handleSubmit}>
//         <input
//           placeholder="Email"
//           id="email"
//           type="text"
//           value={email}
//           onChange={handleEmailChange}
//         /> <input
//         placeholder="Password"
//         id="password"
//         type="password"
//         value={password}
//         onChange={handlePasswordChange}
//       />
//       <input id="submit" type="submit" value="Submit" />
//     </form>
//   </div>
// );
