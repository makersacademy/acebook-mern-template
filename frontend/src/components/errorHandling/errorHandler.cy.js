import errorHandlerMessage from './errorHandlerMessage';
import errorHandlerEmail from './errorHandlerEmail';

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

describe('errorHandlerEmail', () => {
  it('returns an error message when email is empty', () => {
    const result = errorHandlerEmail('');
    expect(result).to.deep.equal(<div>Email can't be empty!!!! :@</div>);
  });

  it('returns an error message when email is invalid format', () => {
    const result = errorHandlerEmail('email<@email.com');
    expect(result).to.deep.equal(
      <div>
        Do you even know what an email looks like? Good luck next time, you are
        clearly going to need it!
      </div>
    );
  });

  it('returns an error message when email is invalid format', () => {
    const result = errorHandlerEmail('email@email@email.com');
    expect(result).to.deep.equal(
      <div>
        Do you even know what an email looks like? Good luck next time, you are
        clearly going to need it!
      </div>
    );
  });

  it('returns an error message when email is invalid format', () => {
    const result = errorHandlerEmail('email@email email.com');
    expect(result).to.deep.equal(
      <div>
        Do you even know what an email looks like? Good luck next time, you are
        clearly going to need it!
      </div>
    );
  });
});
