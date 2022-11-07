import errorHandlerMessage from './errorHandlerMessage';
import errorHandlerEmail from './errorHandlerEmail';
import errorHandlerPassword from './errorHandlerPassword';
import errorHandlerUsersName from './errorHandlerUsersName';

describe('errorHandlerMessage', () => {
  it('returns an error message when message is empty', () => {
    const result = errorHandlerMessage('');
    expect(result.props.id).to.deep.equal('message-error-empty');
  });

  it('returns an error message when message contains invalid characters', () => {
    const result = errorHandlerMessage('Hello, my name is Kyle, and I hate <>');
    expect(result.props.id).to.deep.equal('message-error-invalid');
  });

  it('returns an error message when message contains invalid characters', () => {
    const result = errorHandlerMessage('Hello, my name i{s Kyle, and I hate ');
    expect(result.props.id).to.deep.equal('message-error-invalid');
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
    expect(result.props.id).to.deep.equal('password-error-empty');

    it('returns an error message when password is invalid format', () => {
      const result = errorHandlerPassword('747<>');
      expect(result.props.id).to.deep.equal('password-error-invalid');
    });
  });

  it('returns an error message when password is too short', () => {
    const result = errorHandlerPassword('74');
    expect(result.props.id).to.deep.equal('password-error-invalid');
  });
});

describe('errorHandlerUsersName', () => {
  it('returns an error message when UsersName is invalid format', () => {
    const result = errorHandlerUsersName('Kyle <Book');
    expect(result.props.id).to.deep.equal('usersname-error-invalid');
  });

  it("doesn't return an error message if UsersName is a valid string", () => {
    const result = errorHandlerUsersName('Kyle is our God');
    expect(result).to.be.undefined;
  });
});
