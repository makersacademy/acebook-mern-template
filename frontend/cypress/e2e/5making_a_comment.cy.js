describe("Making a comment", () => {
    const testComment = "this is a comment";

    it("can post a comment to a post", () => {
        cy.visit("/login");
        cy.get("#email").type("someone@example.com");
        cy.get("#password").type("password");
        cy.get("#submit").click();
        cy.url().should("include", "/posts");
        cy.get("[data-cy=post]").first().click();
        cy.get("[data-cy=commententry]").type(testComment);
        cy.contains("Submit Comment").click();
        cy.get("[data-cy=comments]").should("contain.text", testComment);
    });
});
