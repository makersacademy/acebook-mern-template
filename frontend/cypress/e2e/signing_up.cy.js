describe("Signing up", () => {
  it("with valid credentials, redirects to '/login'", () => {
    cy.visit("/signup");
    cy.get('[data-cy="emailSignup"]').type("someone@example.com");
    cy.get('[data-cy="passwordSignup"]').type("password");
    cy.get('[data-cy="fnSignup"]').type("Poppy");
    cy.get('[data-cy="lnSignup"]').type("Smith");
    cy.get('[data-cy="signupButton"]').click()
    //cy.get("#signupButton").click();
    cy.url().should("include", "/login");
  });

  it("with missing password, redirects to '/signup'", () => {
    cy.visit("/signup");
    cy.get('[data-cy="emailSignup"]').type("someone@example.com");
    cy.get('[data-cy="signupButton"]').click()
    cy.url().should("include", "/signup");
  });

  it("with missing email, redirects to '/signup'", () => {
    cy.visit("/signup");
    cy.get("#password").type("password");
    cy.get('[data-cy="signupButton"]').click()
    cy.url().should("include", "/signup");
  });

  it("with missing firstName, redirects to '/signup'", () => {
    cy.visit("/signup");
    cy.get('[data-cy="emailSignup"]').type("someone@example.com");
    cy.get('[data-cy="passwordSignup"]').type("password");
    cy.get('[data-cy="lnSignup"]').type("Smith");
    cy.get('[data-cy="signupButton"]').click()
    cy.url().should("include", "/signup");
  });
});



