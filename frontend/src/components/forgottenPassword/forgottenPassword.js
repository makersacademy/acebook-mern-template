import '../forgottenPassword/forgottenPassword.css'
import React, { Component } from 'react';

class ForgottenPassword extends Component {
  state = {}
  render() {
    return (
      <>
        <img className='image-background' src='/Scratching-Head.png'/>
        <img className='image-background2' src='/Scratching-Head2.png'/>
        <form className='forgotPasswordForm'>
          <h2 className='findAccountLabel'>Find your account</h2>
          <div className="lineBreak"></div>
          <p className='paragraph'>Please enter your email address to search for your account.</p>
          <input className='emailAddressTextbox' placeholder='Email Address' />
          <div className="lineBreak"></div>
          <button type="submit" className="buttonLogin">Submit</button>
        </form>
      </>
    );
  }
}

export default ForgottenPassword;