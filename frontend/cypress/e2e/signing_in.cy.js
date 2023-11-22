/* eslint-disable no-undef */
describe("Signing in", () => {
  before(() => {
    //cy.signup("James Bond", "bond@mi6.com", "password1!");
  });

  it("with valid credentials, redirects to '/posts'", () => {
    cy.signup("James Bond", "bond@mi6.com", "password1!");
    cy.visit("/login");
    
    cy.get("#email").type("bond@mi6.com");
    cy.get("#password").type("password1!");
    cy.get("#submit").click();

    cy.url().should("include", "/posts");
  });

  it("with missing password, redirects to '/login'", () => {
    cy.visit("/login");
    cy.get("#email").type("bond@mi6.com");
    cy.get("#submit").click();

    cy.url().should("include", "/login");
  });

  it("with missing email, redirects to '/login'", () => {
    cy.visit("/login");
    cy.get("#password").type("password1!");
    cy.get("#submit").click();

    cy.url().should("include", "/login");
  });
  //Note username is not required for authentication 
  
});
