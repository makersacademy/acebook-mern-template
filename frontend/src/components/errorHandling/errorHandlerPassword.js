import React from 'react';

const errorHandlerPassword = (password) => {
  if (password === '') {
    return <div>Password can't be empty!!!! :@</div>;
  }
};

export default errorHandlerPassword;
