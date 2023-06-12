const Chance = require('chance');

describe("Signing up", () => {
  it("with valid credentials, redirects to '/login'", () => {
    const chance = new Chance();
    const email = chance.email();
    const password = chance.string({ length: 6, alpha: true, numeric: true });
    const firstName = chance.string({ length: 6, alpha: true, numeric: false });
    const lastName = chance.string({ length: 7, alpha: true, numeric: false });
    const userName = chance.string({ length: 5, alpha: true, numeric: false });

    cy.visit("/signup");
    cy.get("#email").type(email);
    cy.get("#password").type(password);
    cy.get("#firstName").type(firstName);
    cy.get("#lastName").type(lastName);
    cy.get("#userName").type(userName);
    cy.get("#submit").click();

    cy.url().should("include", "/login");
  });

  it("with missing password, redirects to '/signup'", () => {
    cy.visit("/signup");
    cy.get("#email").type("someone@example.com");
    cy.get("#firstName").type("test");
    cy.get("#lastName").type("testson");
    cy.get("#userName").type("testy");
    cy.get("#submit").click();

    cy.url().should("include", "/signup");
  });

  it("with missing email, redirects to '/signup'", () => {
    cy.visit("/signup");
    cy.get("#password").type("password");
    cy.get("#firstName").type("test");
    cy.get("#lastName").type("testson");
    cy.get("#userName").type("testy");
    cy.get("#submit").click();

    cy.url().should("include", "/signup");
  });
  it("with missing first name, redirects to '/signup'", () => {
    cy.visit("/signup");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#lastName").type("testson");
    cy.get("#userName").type("testy");
    cy.get("#submit").click();

    cy.url().should("include", "/signup");
  });
  it("with missing last name, redirects to '/signup'", () => {
    cy.visit("/signup");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#firstName").type("test");
    cy.get("#userName").type("testy");
    cy.get("#submit").click();

    cy.url().should("include", "/signup");
  });
  it("with missing userName, redirects to '/signup'", () => {
    cy.visit("/signup");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#firstName").type("test");
    cy.get("#lastName").type("testson");
    cy.get("#submit").click();

    cy.url().should("include", "/signup");
  });
});