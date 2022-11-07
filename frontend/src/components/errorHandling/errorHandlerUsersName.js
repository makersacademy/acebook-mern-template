import React from 'react';

const errorHandlerUsersName = (usersName) => {
  if (usersName === '') {
    return <div id="password-error-empty">Name can't be empty!!!! :@</div>;
  } else if (!usersName.match(/^[a-z ,.'-]*$/i)) {
    return (
      <div id="usersname-error-invalid">
        Did you introduce some weird and not-allowed-at-all character as a name?
      </div>
    );
  }
};

export default errorHandlerUsersName;
