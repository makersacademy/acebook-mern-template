describe("Make new post", () => {

    before(() => {
        cy.signup("user@email.com", "12345678", "someone", "surname")
        cy.login("user@email.com", "12345678")
    })

    it("Posts a new message", () => {
        cy.visit("/");
        cy.get("#formCreatePost").type("hello world");
        cy.get("#submitButton").click();
        cy.get("div:contains(hello world)").should("be.visible");
        cy.get("div:contains(posted at:)").should("be.visible");
        });
});