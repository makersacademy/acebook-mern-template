describe("Making a new post", () => {
    beforeEach(() => {
        cy.login("someone@example.com", "password")
        cy.visit("/posts");
    });
    
    it("when giving a string, redirects to '/posts", () => {
        cy.get("#createNewPost").click();
        cy.get("#message").type('My Test Post');
        cy.get("#submit").click();
        cy.url().should("include", "/posts");
    });

    it("the new post is showing on the feed", () => {
        cy.get("#createNewPost").click();
        cy.get("#message").type('AAAAAAAAAA');
        cy.get("#submit").click();
        cy.contains("AAAAAAAAAA");
    });

});