import errorHandlerMessage from './errorHandlerMessage';
import errorHandlerEmail from './errorHandlerEmail';
import errorHandlerPassword from './errorHandlerPassword';
import errorHandlerUsersName from './errorHandlerUsersName';

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
    expect(result.props.id).to.deep.equal('email-error-empty');
  });

  it('returns an error message when email is invalid format', () => {
    const result = errorHandlerEmail('email<@email.com');
    expect(result.props.id).to.deep.equal('email-error-invalid');
  });

  it('returns an error message when email is invalid format', () => {
    const result = errorHandlerEmail('email@email@email.com');
    expect(result.props.id).to.deep.equal('email-error-invalid');
  });

  it('returns an error message when email is invalid format', () => {
    const result = errorHandlerEmail('email@email email.com');
    expect(result.props.id).to.deep.equal('email-error-invalid');
  });

  it('does not return an error message when email is valid format', () => {
    const result = errorHandlerEmail('email@email.com');
    expect(result).to.be.undefined;
  });
});

describe('errorHandlerPassword', () => {
  it('returns an error message when password is empty', () => {
    const result = errorHandlerPassword('');
    expect(result).to.deep.equal(<div>Password can't be empty!!!! :@</div>);
  });

  it('returns an error message when password is invalid format', () => {
    const result = errorHandlerPassword('747<>');
    expect(result).to.deep.equal(
      <div>
        Your password must be only alphanumeric, between 4 and 25 characters and
        give us ownership over your soul.
      </div>
    );
  });

  it('returns an error message when password is too short', () => {
    const result = errorHandlerPassword('74');
    expect(result).to.deep.equal(
      <div>
        Your password must be only alphanumeric, between 4 and 25 characters and
        give us ownership over your soul.
      </div>
    );
  });
});

describe('errorHandlerUsersName', () => {
  it('returns an error message when UsersName is invalid format', () => {
    const result = errorHandlerUsersName('Kyle <Book');
    expect(result).to.deep.equal(
      <div>
        Did you introduce some weird and not-allowed-at-all character as a name?
      </div>
    );
  });

  it("doesn't return an error message if UsersName is empty", () => {
    const result = errorHandlerUsersName('');
    expect(result).to.be.undefined;
  });

  it("doesn't return an error message if UsersName is a valid string", () => {
    const result = errorHandlerUsersName('Kyle is our God');
    expect(result).to.be.undefined;
  });
});
