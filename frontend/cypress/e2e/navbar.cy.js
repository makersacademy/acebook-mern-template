//cy.signup("name", "surname", "someone@example.com", "password");


describe('Navbar', () => {
  it('shows navbar once user has signed in', () => {
    cy.visit("/signup")
    cy.get('nav').should('not.exist')
    cy.signup("name", "surname", "someone@example.com", "password");

    cy.visit("/login");
    cy.get('nav').should('not.exist')
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    cy.wait(1000)
    cy.get('nav').should('exist').and('contain','Home')
  })
})