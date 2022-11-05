import React from 'react';

const errorHandlerEmail = (email) => {
  if (email === '') {
    return <div>Email can't be empty!!!! :@</div>;
  }
};

export default errorHandlerEmail;
