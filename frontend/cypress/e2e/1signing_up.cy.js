describe("Signing up", () => {

  it("with valid credentials, redirects to '/login'", () => {
    cy.visit("/signup");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#username").type("usernamename");
    cy.get("#submit").click();
    cy.url().should("include", "/login");
  });

  it("with missing password, redirects to '/signup'", () => {
    cy.visit("/signup");
    cy.get("#email").type("someone@example.com");
    cy.get("#username").type("usernamename")
    cy.get("#submit").click();
    cy.url().should("include", "/signup");
  });

  it("with missing email, redirects to '/signup'", () => {
    cy.visit("/signup");
    cy.get("#password").type("password");
    cy.get("#username").type("usernamename")
    cy.get("#submit").click();
    cy.url().should("include", "/signup");
  });

  it("with missing username, redirects to '/signup'", () => {
    cy.visit("/signup");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    cy.url().should("include", "/signup");
  });
  it("navigate to log in page when log in button is clicked", () => {
    cy.visit("/signup");
    cy.get("#button").click();
    cy.url().should("include", "/login");
  });
});