import React from "react";
import SignUpFormComponent from '../signupForm/SignUpForm'

const SignUpForm = ({ navigate }) => {

  return (
    <>
    <div id="header_wrapper">
      <div id="header">
        <li id="sitename">
          <a href="/login">Acebook</a>
        </li>
      </div>
    </div>
    <SignUpFormComponent navigate={ navigate }/>
    </>
  );
};

export default SignUpForm;
