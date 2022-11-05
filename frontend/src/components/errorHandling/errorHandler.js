import React from 'react';

const errorHandlerMessage = (message) => {
  if (message === '') {
    return (
      <div>
        You need to write some text if you want to express your hate, you idiot.
      </div>
    );
  }
};

export default errorHandlerMessage;
