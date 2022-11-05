import React from 'react';

const errorHandlerUsersName = (usersName) => {
  if (!usersName.match(/^[a-z ,.'-]*$/i)) {
    return (
      <div>
        Did you introduce some weird and not-allowed-at-all character as a name?
      </div>
    );
  }
};

export default errorHandlerUsersName;
