import { faker } from '@faker-js/faker'

describe("Signing up", () => {
  it("with valid credentials, redirects to '/choose-avatar'", () => {
    cy.visit("/signup");
    cy.get("#username").type("James Bond");
    cy.get("#email").type(faker.internet.exampleEmail());
    cy.get("#password").type("password1!");
    cy.get("#password_confirmation").type("password1!");
    cy.get("#submit").click();

    cy.url().should("include", "/choose-avatar");
  });

  it("with missing password redirect to signup", () => {
    cy.visit("/signup");
    cy.get("#username").type("James Bond");
    cy.get("#email").type(faker.internet.exampleEmail());
    cy.get("#submit").click();
    
    cy.url().should("include", "/signup");
  });

  it("with missing email, redirects to '/signup'", () => {
    cy.visit("/signup");
    cy.get("#username").type("James Bond");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.url().should("include", "/signup");
  });
  it("with missing username, redirects to '/signup'", () => {
    cy.visit("/signup");
    cy.get("#email").type(faker.internet.exampleEmail());
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.url().should("include", "/signup");
  });

  it("with invalid password, shows a popup message'", () => {
    cy.visit("/signup");
    cy.get("#email").type(faker.internet.exampleEmail());
    cy.get("#password").type("password");
    cy.get("#password_confirmation").type("password");
    cy.get("#submit").click();

    cy.on('window:confirm', message => {
      expect(message).t.equal("Password must be at least 8 characters long\nPassword must contain at least one number and special sign\n")
    })
  });
});
