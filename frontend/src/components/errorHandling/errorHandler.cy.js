// const { errorHandlerMessage, errorHandlerEmail } = require('./errorHandler');
import errorHandlerMessage from './errorHandler';
// const errorHandlerMessage = errorHandler.errorHandlerMessage;
// const errorHandlerEmail = errorHandler.errorHandlerEmail;
// const errorHandlerPassword = errorHandler.errorHandlerPassword;
// const errorHandlerUsersName = errorHandler.errorHandlerUsersName;

describe('errorHandlerMessage', () => {
  it('returns an error message when message is empty', () => {
    const result = errorHandlerMessage('');
    expect(result).to.deep.equal(
      <div>
        You need to write some text if you want to express your hate, you idiot.
      </div>
    );
  });
});
