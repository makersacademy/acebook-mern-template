import React, { useState } from 'react';

const Form = ({ form_type }) => {
  const [inputValue, setInputValue] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    
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
