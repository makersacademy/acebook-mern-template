import React, { useState } from 'react';

const Form = ({ form_type, token }) => {
  const [inputValue, setInputValue] = useState('');
  const [stringMessage, setStringMessage] = useState('');
  const handleSubmit = async (e) => {
    form_type === 'display'
      ? setStringMessage(`newDisplayName: ${inputValue}`)
      : form_type === 'email'
      ? setStringMessage(`newEmail: ${inputValue}`)
      : form_type === 'bio'
      ? setStringMessage(`newBio: ${inputValue}`)
      : form_type === 'password'
      ? setStringMessage(`newPassword: ${inputValue}`)
      : setStringMessage(null);

    e.preventDefault();
    //display form
    fetch('/account', {
      method: 'put',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        stringMessage,
      }),
    }).then((response) => {
      if (response.status === 204) {
        console.log('inputvalue: ', inputValue);
        console.log(`${form_type} changed`);
      } else {
        console.log(`Error changing ${form_type}`);
      }
    });
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type={
            form_type === 'password'
              ? 'password'
              : form_type === 'image'
              ? 'file'
              : 'text'
          }
          placeholder={
            form_type === 'display'
              ? 'New display name'
              : form_type === 'email'
              ? 'New email address'
              : form_type === 'bio'
              ? 'New bio'
              : form_type === 'image'
              ? null
              : form_type === 'password'
              ? 'New password'
              : null
          }
          value={form_type === 'image' ? '' : inputValue}
          onChange={form_type === 'image' ? null : handleInputChange}
        ></input>
        <button type='submit'>Confirm</button>
      </form>
    </div>
  );
};

export default Form;
