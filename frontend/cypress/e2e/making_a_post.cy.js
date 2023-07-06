describe("making a post", () => {

    before(() => {
        cy.visit("/signup");
        cy.signup("user@email.com", "12345678")
        cy.visit("/login");
        cy.login("user@email.com", "12345678") // check this code 
    })

    it(" creates a post and submits to the backend", () => {
  
        cy.visit("/posts");
        const message = "something"
        // Function to create a post
        const createPost = (message) => {
        cy.get("#message").type(message);
        cy.get("#submit").click();
      };
  
      createPost(message);
    
        cy.contains(message).should("exist"); // need to figure what to put here!!!!!!!!
      });
});