import React from 'react';

const errorHandlerPassword = (password) => {
  if (password === '') {
    return <div id="password-error-empty">Password can't be empty!!!! :@</div>;
  } else if (!password.match(/^[a-zA-Z0-9]{4,25}$/)) {
    // ONLY ALPHANUMERIC, at least 4 characters, max 25 characters.
    return (
      <div id="password-error-invalid">
        Your password must be only alphanumeric, between 4 and 25 characters and
        give us ownership over your soul.
      </div>
    );
  }
};

export default errorHandlerPassword;
