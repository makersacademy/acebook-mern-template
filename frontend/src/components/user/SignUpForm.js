import React, { useState } from 'react';
import styles from './SignUpForm.module.css';


// Signup Page
const SignUpForm = ({ navigate }) => {

  // STATE VARIABLES ==========================
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("")
  // FORM SUBMISSION FOR NEW USER ====================
  const handleSubmit = async (event) => {
    event.preventDefault(); 
    // Send POST request to '/users' endpoint
    fetch( '/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password }) // <===== BODY OF REQUEST: email and password
    })
      .then(async response => {
        
        
        if(response.status === 201) {
          navigate('/login') // If successful, navigate to login page
          
        } else {
          const errorData = await response.json();
          navigate('/signup') // If unsuccessful, stay on the signup page
          setErrorMsg(errorData.message)
          console.log(errorData.message)
        }
      })
  }

  // FUNCTIONS FOR CHANGING STATE VARIABLES ==================
  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }


  // JSX FOR THE UI OF THE COMPONENT =====================
    // currently shows two input fields and one button with no styling.
    return (<div className={styles.Middle}>
      <form onSubmit={handleSubmit}>

          <input placeholder="Email" id="email" type='text' value={ email } className={styles.inputField} onChange={handleEmailChange} />
          <br/>
          <input placeholder="Password" id="password" type='password' value={ password } className={styles.inputField} onChange={handlePasswordChange} />
          <br/>
          <br/>
        <input id='submit' type="submit" className={styles.Button} value="Submit"/>
         <h2>{errorMsg}</h2>

      </form>
    </div>
);
}


export default SignUpForm;
