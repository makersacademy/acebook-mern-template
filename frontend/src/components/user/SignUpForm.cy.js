import SignUpForm from './SignUpForm';
const navigate = () => {};

describe('Signing up', () => {
  it('calls the /users endpoint', () => {
    cy.mount(<SignUpForm navigate={navigate} />);

    cy.intercept('POST', '/users', { message: 'OK' }).as('signUpRequest');

    cy.get('#email').type('someone@example.com');
    cy.get('#password').type('password');
    cy.get('#submit').click();
    cy.wait('@signUpRequest').then((interception) => {
      expect(interception.response.body.message).to.eq('OK');
    });
  });
  it('allows the user to include a displayname', () => {
    cy.mount(<SignUpForm navigate={navigate} />);

    cy.intercept('POST', '/users', { message: 'OK' }).as('signUpRequest');

    cy.get('#email').type('someone@example.com');
    cy.get('#password').type('password');
    cy.get('#display_name').type('John Smith');
    cy.get('#submit').click();
    cy.wait('@signUpRequest').then((interception) => {
      expect(interception.response.body.message).to.eq('OK');
    });
  });
});
