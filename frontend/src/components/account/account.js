import React, { useState } from 'react';
import Form from './form/form';

const Account = () => {
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState('');
  const [token, setToken] = useState(window.localStorage.getItem('token'));
  // const [id, setId] = useState(window.localStorage.getItem('user_id'));

  return (
    <>
      <h2>Welcome</h2>
      <button
        id="display-button"
        onClick={() => {
          formType === 'display' ? setShowForm(!showForm) : setShowForm(true);
          setFormType('display');
        }}
      >
        Edit display name
      </button>

      <button
        id="email-button"
        onClick={() => {
          formType === 'email' ? setShowForm(!showForm) : setShowForm(true);
          setFormType('email');
        }}
      >
        Edit email
      </button>

      <button
        id="bio-button"
        onClick={() => {
          formType === 'bio' ? setShowForm(!showForm) : setShowForm(true);
          setFormType('bio');
        }}
      >
        Edit bio
      </button>

      <button
        id="image-upload-button"
        onClick={() => {
          formType === 'image' ? setShowForm(!showForm) : setShowForm(true);
          setFormType('image');
        }}
      >
        Upload image
      </button>

      <button
        id="password-button"
        onClick={() => {
          formType === 'password' ? setShowForm(!showForm) : setShowForm(true);
          setFormType('password');
        }}
      >
        Edit password
      </button>
      {showForm ? (
        <div>
          <Form token={token} form_type={formType} setShowForm={setShowForm} />
        </div>
      ) : null}
    </>
  );
};

export default Account;
