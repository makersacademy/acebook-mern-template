import React, { useState } from 'react';
import { Form } from './form/form';

const Account = () => {
  const [showDisplayForm, setShowDisplayForm] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showImagedForm, setShowImageForm] = useState(false);
  const [showBioForm, setShowBioForm] = useState(false);

  return (
    <>
      <h2>Welcome</h2>
      <button
        onClick={() => {
          setShowDisplayForm(!showDisplayForm);
        }}
      >
        Edit display name{' '}
      </button>
      {showDisplayForm ? (
        <div>
          <Form form_type={'display_name'} />
        </div>
      ) : null}

      <button
        onClick={() => {
          setShowEmailForm(!showEmailForm);
        }}
      >
        Edit email
      </button>
      {showEmailForm ? (
        <div>
          <Form form_type={'email'} />
        </div>
      ) : null}

      <button
        onClick={() => {
          setShowBioForm(!showBioForm);
        }}
      >
        Edit bio
      </button>
      {showBioForm ? (
        <div>
          <Form form_type={'bio'} />
        </div>
      ) : null}

      <button
        onClick={() => {
          setShowImageForm(!showImagedForm);
        }}
      >
        Upload image
      </button>
      {showImagedForm ? (
        <div>
          <Form form_type={'image'} />
        </div>
      ) : null}

      <button
        onClick={() => {
          setShowPasswordForm(!showPasswordForm);
        }}
      >
        Edit password
      </button>
      {showPasswordForm ? (
        <div>
          <Form form_type={'password'} />
        </div>
      ) : null}
    </>
  );
};

export default Account;
