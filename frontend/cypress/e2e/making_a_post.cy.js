describe("making a post", () => {

    before(() => {
        cy.signup("someone@example.com", "123456789")
    })

    it(" creates a post and submits to the backend", () => {

      cy.visit("/login");

      cy.get("#email").type("someone@example.com");
      cy.get("#password").type("123456789");
      cy.get("#submit").click();

       // check this code 
       const message = "something"

       cy.get("#message").type("something");
       cy.get("#submit").click();
    
      cy.contains(message).should("exist"); // need to figure what to put here!!!!!!!!
      });
});