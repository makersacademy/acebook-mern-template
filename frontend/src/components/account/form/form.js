import React, { useState } from 'react';

const Form = ({ form_type, token, setShowForm }) => {
  const [inputValue, setInputValue] = useState('');
  const [file, setFile] = useState(null);
  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (form_type === 'display') {
      formData.append('newDisplayName', inputValue);
    } else if (form_type === 'email') {
      formData.append('newEmail', inputValue);
    } else if (form_type === 'bio') {
      formData.append('newBio', inputValue);
    } else if (form_type === 'password') {
      formData.append('newPassword', inputValue);
    } else if (form_type === 'image') {
      formData.append('image', file);
    }

    fetch('/account', {
      method: 'put',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }).then((response) => {
      if (response.status === 204) {
        console.log('inputvalue: ', inputValue);
        console.log(`${form_type} changed`);
        alert(`${form_type} changed`);
        setShowForm(false);
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
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <input
          type={form_type === 'image' ? 'file' : 'text'}
          placeholder={
            form_type === 'display'
              ? 'New display name'
              : form_type === 'email'
              ? 'New email address'
              : form_type === 'bio'
              ? 'New bio'
              : form_type === 'image'
              ? 'Choose image'
              : form_type === 'password'
              ? 'New password'
              : null
          }
          onChange={
            form_type === 'image' ? handleFileInputChange : handleInputChange
          }
        />
        <button type='submit'>Confirm</button>
      </form>
    </div>
  );
};

export default Form;
