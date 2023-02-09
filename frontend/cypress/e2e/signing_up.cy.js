describe('Signing up', () => {
  it("with valid credentials, redirects to '/login'", () => {
    cy.visit('/signup');
    cy.get('#email').type('someone@example.com');
    cy.get('#password').type('password');
    cy.get('#submit').click();

    cy.url().should('include', '/login');
  });

  it("with missing password, redirects to '/signup'", () => {
    cy.visit('/signup');
    cy.get('#email').type('someone@example.com');
    cy.get('#submit').click();

    cy.url().should('include', '/signup');
  });

  it("with missing email, redirects to '/signup'", () => {
    cy.visit('/signup');
    cy.get('#password').type('password');
    cy.get('#submit').click();

    cy.url().should('include', '/signup');
  });

  it('with a display name, should redirect to /login', () => {
    cy.visit('/signup');
    cy.get('#email').type('someone@example.com');
    cy.get('#password').type('password');
    cy.get('#display_name').type('John Smith');
    cy.get('#submit').click();

    cy.url().should('include', '/login');
  });
});
