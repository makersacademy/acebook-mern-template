describe('redirect', () => {
  it('redirects to posts page if logged in and tries to access login route', () => {
    cy.visit("/signup")
    cy.signup("name", "surname", "someone@example.com", "password");
    
    cy.visit("/login");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.visit("/login");
    cy.url().should('include', '/posts');
    cy.get('[data-cy="logoutButton"]').click();
  })

  it('redirects to login page if not logged in and tries to access posts route', () => {
    cy.visit("/posts");
    cy.wait(1000)
    cy.url().should('include', '/login');
  })
})