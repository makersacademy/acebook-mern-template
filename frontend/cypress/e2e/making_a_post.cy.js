describe("making a post", () => {

    before(() => {
        cy.signup("user@email.com", "12345678")
        cy.login("user@email.com", "12345678") // double check this
    })

    it(" creates a post and submits to the backend", () => {
        cy.visit("/Post");
        cy.get("#message").type("somestring");
        cy.get("#submit").click();
    
        cy.contains().should("somestring", "/Posts"); // need to figure what to put here!!!!!!!!
      });
});