describe("Make new post", () => {

    before(() => {
        cy.signup("user@email.com", "12345678");
        cy.visit("/login");
        cy.get("#email").type("someone@example.com");
        cy.get("#password").type("password");
        cy.get("#submit").click();
    })

    it("Posts a new message", () => {
        cy.visit("/");
        cy.get("#formCreatePost").type("hello world");
        cy.get("#submitButton").click();
        cy.wait(2000);
        cy.reload();
        cy.get("div:contains(hello world)").should("be.visible");
        cy.get("div:contains(posted at:)").should("be.visible");
        });
});