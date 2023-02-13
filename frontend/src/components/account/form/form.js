import React, { useState } from 'react';

const Form = ({ form_type, token }) => {
  const [inputValue, setInputValue] = useState('');

  let stringMessage;

  const handleSubmit = async (e) => {
    const inputElement = document.querySelector('input[type="file"]');
    const formData = new FormData();
    formData.append('image', inputElement.files[0]);
    e.preventDefault();
    form_type === 'display'
      ? (stringMessage = JSON.stringify({ newDisplayName: inputValue }))
      : form_type === 'email'
      ? (stringMessage = JSON.stringify({ newEmail: inputValue }))
      : form_type === 'bio'
      ? (stringMessage = JSON.stringify({ newBio: inputValue }))
      : form_type === 'password'
      ? (stringMessage = JSON.stringify({ newPassword: inputValue }))
      : (stringMessage = null);
    !form_type === 'image'
      ? fetch('/account', {
          method: 'put',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: stringMessage,
        }).then((response) => {
          if (response.status === 204) {
            console.log('inputvalue: ', inputValue);
            console.log(`${form_type} changed`);
          } else {
            console.log(`Error changing ${form_type}`);
            console.log('inputvalue: ', inputValue);
          }
        })
      : fetch('/account', {
          method: 'put',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: formData,
        }).then((response) => {
          if (response.status === 204) {
            console.log('inputvalue: ', inputValue);
            console.log(`${form_type} changed`);
          } else {
            console.log(formData);
            console.log(`Error changing ${form_type}`);
            console.log('inputvalue: ', inputValue);
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
          value={!form_type === 'image' ? inputValue : null}
          onChange={handleInputChange}
        ></input>
        <button type='submit'>Confirm</button>
        {formData ? formData : null} 
      </form>
    </div>
  );
};

export default Form;
