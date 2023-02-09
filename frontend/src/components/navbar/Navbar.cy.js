import Navbar from './Navbar'
const navigate = () => {}

describe("Navbar", () => {
  it("Sign in link appears when the user is not signed in", () => {
    cy.mount(<Navbar navigate={ navigate } signedIn={ false } />);
    cy.get('[data-cy="nav"]').should('contain.text', 'Sign in');
    cy.get('[data-cy="nav"]').should('not.contain.text', 'Sign out');
  })

  it("Sign out link appears when the user is signed in", () => {
    cy.mount(<Navbar navigate={ navigate } signedIn={ true } />);
    cy.get('[data-cy="nav"]').should('contain.text', 'Sign out');
    cy.get('[data-cy="nav"]').should('not.contain.text', 'Sign in');
  })
})