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

  it('returns an error message when message contains invalid characters', () => {
    const result = errorHandlerMessage('Hello, my name is Kyle, and I hate <>');
    expect(result).to.deep.equal(
      <div>
        You have introduced some invalid special characters, good luck next
        time, you clearly need it.
      </div>
    );
  });

  it('returns an error message when message contains invalid characters', () => {
    const result = errorHandlerMessage('Hello, my name i{s Kyle, and I hate ');
    expect(result).to.deep.equal(
      <div>
        You have introduced some invalid special characters, good luck next
        time, you clearly need it.
      </div>
    );
  });

  it("doesn't return anything if the given string is valid", () => {
    const result = errorHandlerMessage(
      'Hello, my name is Kyle, and I hate ##@!!!???.,'
    );
    expect(result).to.be.undefined;
  });
});
