import Home from './Home';

describe('Home', () => {
  beforeEach(() => {
    cy.mount(
        <Home />
    );
  });
  it('renders the correct text', () => {
    cy.contains('Home');
    cy.contains('Log in');
    cy.contains('Sign up');
  });

  it('links to the login page', () => {
    cy.get('#login').click();
    cy.url().should('include', '/login');
  });

  it('links to the signup page', () => {
    cy.get('#sign-up').click();
    cy.url().should('include', '/signup');
  });
});