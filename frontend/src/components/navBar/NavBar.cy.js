import NavBar from "./NavBar";

describe('NavBar', () => {
  it('mounts', () => {
    cy.mount(<NavBar />);
    cy.get('[data-cy="header"]').should('contains.text', "Acebook")
  });
});
