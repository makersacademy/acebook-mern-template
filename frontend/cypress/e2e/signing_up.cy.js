describe("Signing up", () => {
  it("with valid credentials, redirects to '/login'", () => {
    cy.visit("/signup");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#firstName").type("Poppy");
    cy.get("#lastName").type("Smith");
    cy.get("#loginbutton").click();
    cy.url().should("include", "/login");
  });

  it("with missing password, redirects to '/signup'", () => {
    cy.visit("/signup");
    cy.get("#email").type("someone@example.com");
    cy.get("#submit").click();
    cy.url().should("include", "/signup");
  });

  it("with missing email, redirects to '/signup'", () => {
    cy.visit("/signup");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    cy.url().should("include", "/signup");
  });

  it("with missing firstName, redirects to '/signup'", () => {
    cy.visit("/signup");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#lastName").type("Smith");
    cy.get("#submit").click();
    cy.url().should("include", "/signup");
  });
});