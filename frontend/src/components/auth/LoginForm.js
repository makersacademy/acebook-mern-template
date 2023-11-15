import React, { useState } from 'react';
import styles from './LoginForm.module.css'

// Login Page
const LogInForm = ({ navigate }) => {

  // =========== STATE VARIABLES ==========================
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ============ FORM SUBMISSION FOR LOGIN ====================
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Send POST request to '/tokens' endpoint <== not sure where this is in our project
    let response = await fetch( '/tokens', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password })
    })

    // Checking the response status
    if(response.status !== 201) { // login not successful
      console.log("oop")
      navigate('/login')
    } else { // login successful
      console.log("yay")
      let data = await response.json()
      window.localStorage.setItem("token", data.token)
      navigate('/posts');
    }
  }

  // ------------ SUPPORTIVE FUNCTIONS: ----------------
  // FUNCTIONS FOR CHANGING STATE VARIABLES 
  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }


  // ========= JSX FOR THE UI OF THE COMPONENT =====================
    // currently shows two input fields and one button with no styling.
    return (
      <div className={styles.Middle}>
      <form onSubmit={handleSubmit}>
        <input placeholder='Email' id="email" type='text' value={ email } onChange={handleEmailChange}  className={styles.inputField}/><br/>
        <input placeholder='Password' id="password" type='password' value={ password } onChange={handlePasswordChange} className={styles.inputField} /><br/>
        <input  id='submit' type="submit" value="Submit" className={styles.Button}/>
      </form>
      <br/>

<font color="#505050 ">Don't have an account?</font>
<br/>
<a href="/signup" font color="#003163" className={styles.link}> Register</a>

</div>
    );
}

export default LogInForm;
