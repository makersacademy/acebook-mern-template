import React from 'react';

export const Form = ({ form_type }) => {
  return (
    <div>
      <form>
        <input
          type={
            form_type === 'password'
              ? 'password'
              : form_type === 'image'
              ? 'file'
              : 'text'
          }
        ></input>
        <button type="submit">Confirm</button>
      </form>
    </div>
  );
};
