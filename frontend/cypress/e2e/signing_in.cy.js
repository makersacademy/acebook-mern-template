describe("Signing in", () => {

  before(() => {
    cy.signup("someone@example.com", "testuser", "Password1234")
  })

  it("with valid credentials, redirects to '/posts'", () => {
    cy.visit("/login");
    cy.get("#username").type("testuser");
    cy.get("#password").type("Password1234");
    cy.get("#submit").click();

    cy.url().should("include", "/posts");
  });

  it("with missing password, redirects to '/login'", () => {
    cy.visit("/login");
    cy.get("#username").type("testuser");
    cy.get("#submit").click();

    cy.url().should("include", "/login");
  });

  it("with missing email, redirects to '/login'", () => {
    cy.visit("/login");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.url().should("include", "/login");
  });
});