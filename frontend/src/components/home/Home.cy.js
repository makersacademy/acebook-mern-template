import Home from './Home';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Home', () => {
  beforeEach(() => {
    cy.mount(
      <Router>
        <Home />
      </Router>
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