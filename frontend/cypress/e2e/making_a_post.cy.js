describe("Posting a message", () => {
    it("adds to the list of posts with valid input and displays the username", () => {
      cy.visit("/login");
      cy.get("#email").type("someone@example.com");
      cy.get("#password").type("password");
      cy.get("#submit").click();
      cy.visit("/posts")
      cy.get("#message").type("Test post")
      cy.contains("Test post");
      cy.contains("username1");
    })
})