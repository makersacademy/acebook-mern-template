describe("Signing in", () => {
const testEmail = "someone@example.com"
const testPassword = "password"
const testUsername= "usernamenamer"

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
   it("navigate to sign up page when sign up button is clicked", () => {
     cy.visit("/login");
     cy.get("#sign-up-button").click();
     cy.url().should("include", "/signup");
   });
});