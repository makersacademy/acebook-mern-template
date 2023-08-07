describe("Signing in", () => {
const testEmail = "user1@email.com"
const testPassword = "12345678"
const testUsername= "usernamenamer"
  before(() => {
    cy.signup(testEmail, testPassword, testUsername)
  });

  it("with valid credentials, redirects to '/posts'", () => {
    cy.visit("/login");
    cy.get("#email").type(testEmail);
    cy.get("#password").type(testPassword);
    cy.get("#submit").click();
    cy.url().should("include", "/posts");
  });

  it("with missing password, redirects to '/login'", () => {
    cy.visit("/login");
    cy.get("#email").type(testEmail);
    cy.get("#submit").click();
    cy.url().should("include", "/login");
  });

  it("with missing email, redirects to '/login'", () => {
    cy.visit("/login");
    cy.get("#password").type(testPassword);
    cy.get("#submit").click();
    cy.url().should("include", "/login");
  });

});