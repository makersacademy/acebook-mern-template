import React, { useState } from 'react';
import Form from './form/form';
import { Link } from "react-router-dom";
import styles from "./account.module.css";

const Account = () => {
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState('');
  const [token, setToken] = useState(window.localStorage.getItem('token'));

  return (
    <>
      <div className={styles.accountContainer}>
        <h2>Edit your Account Details</h2>
      </div>

      <div className={styles.accountContainer}>
        <Link id="display-button"
            onClick={() => {
              formType === 'display' ? setShowForm(!showForm) : setShowForm(true);
              setFormType('display');}
            }>

            <img src="/images/buttons/edit-display-name.svg" alt="edit display name button" />
          </Link>
        
          <Link id="email-button"
          onClick={() => {
            formType === 'email' ? setShowForm(!showForm) : setShowForm(true);
            setFormType('email');}
            }>

            <img src="/images/buttons/edit-email.svg" alt="edit email button" />
          </Link>

          <Link id="bio-button"
          onClick={() => {
            formType === 'bio' ? setShowForm(!showForm) : setShowForm(true);
            setFormType('bio');}
            }>

            <img src="/images/buttons/edit-bio.svg" alt="bio button" />
          </Link>

          <Link id="image-upload-button"
          onClick={() => {
            formType === 'image' ? setShowForm(!showForm) : setShowForm(true);
            setFormType('image');}
            }>

            <img src="/images/buttons/upload-image.svg" alt="upload image button" />
          </Link>
          
          
          <Link id="password-button"
          onClick={() => {
            formType === 'password' ? setShowForm(!showForm) : setShowForm(true);
            setFormType('password');}
            }>

            <img src="/images/buttons/edit-password.svg" alt="edit password button" />
          </Link>


        {showForm ? (
          <div>
            <Form token={token} form_type={formType} setShowForm={setShowForm} />
          </div>
        ) : null}
      </div>
  </>
  );
};

export default Account;