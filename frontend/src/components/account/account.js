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
        onClick={() => {
          formType === 'display' ? setShowForm(!showForm) : setShowForm(true);
          setFormType('display');
        }}
      >
        Edit display name
      </button>

      <button
        onClick={() => {
          formType === 'email' ? setShowForm(!showForm) : setShowForm(true);
          setFormType('email');
        }}
      >
        Edit email
      </button>

      <button
        onClick={() => {
          formType === 'bio' ? setShowForm(!showForm) : setShowForm(true);
          setFormType('bio');
        }}
      >
        Edit bio
      </button>

      <button
        onClick={() => {
          formType === 'image' ? setShowForm(!showForm) : setShowForm(true);
          setFormType('image');
        }}
      >
        Upload image
      </button>

      <button
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
