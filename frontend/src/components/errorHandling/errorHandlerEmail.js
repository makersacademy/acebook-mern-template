import React from 'react';

const errorHandlerEmail = (email) => {
  if (email === '') {
    return <div id="email-error-empty">Email can't be empty!!!! :@</div>;
  } else if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    return (
      <div id="email-error-invalid">
        Do you even know what an email looks like? Good luck next time, you are
        clearly going to need it!
      </div>
    );
  }
};

export default errorHandlerEmail;
