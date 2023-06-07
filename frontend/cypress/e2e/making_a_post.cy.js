describe('Making a post', () => {
  
  beforeEach(() => {
    cy.signup("user@email.com", "12345678")
    cy.visit("/login");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
  });

  it('should make a post when user is logged in', () => {
    cy.visit('/create-post');
    cy.get('#message').type('quack quack quack');
    cy.get('#submit').click();
    cy.get('.post').should('have.length', 1);
    cy.url().should("include", "/posts");
  })
});