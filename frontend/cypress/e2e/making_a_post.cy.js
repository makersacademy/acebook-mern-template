describe("Making a new post", () => {
    const testEmail = "user1@email.com"
    const testPassword = "12345678"
    const testUsername= "usernamenamer"
    beforeEach(() => {
        cy.signup(testEmail, testPassword, testUsername)
        cy.login(testEmail, testPassword)
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