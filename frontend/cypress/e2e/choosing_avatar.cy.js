/* eslint-disable no-undef */
describe("Choosing avatar", () => {
    it("with choice made, redirects to '/login'", () => {
      cy.visit("/signup");
      cy.get("#username").type("James Bond");
      cy.get("#email").type("someone@example.com");
      cy.get("#password").type("password");
      cy.get("#submit").click();
    

      cy.get("#avatar1").click();
      cy.get("#submit").click();

      cy.url().should("include", "/login");

    });
  
    it("with missing avatar choice, redirects to '/choose-avatar'", () => {
        cy.visit("/signup");
        cy.get("#username").type("James Bond");
        cy.get("#email").type("someone@example.com");
        cy.get("#password").type("password");
        cy.get("#submit").click();
      
        cy.get("#submit").click();
  
        cy.url().should("include", "/choose-avatar");
    });
  });
  