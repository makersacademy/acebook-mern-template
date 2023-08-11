describe("Editing a post", () => {
    beforeEach(() => {
        cy.login("someone@example.com", "password")
        cy.visit("/posts");
    });

    describe("when logged in user is the author of the post", () => {
        it("has an edit post form", () => {
            cy.contains("My Test Post").click()
            cy.get("[data-cy=editPostForm]").should("exist")
            })
        })
        it("edits the post", () => {
            cy.contains("My Test Post").click()
            cy.get("[data-cy=editPost]").clear().type("edited post")
            cy.get('[data-cy=submit]').click()

            cy.get("[data-cy=post]").should("contain.text", "edited post")
            cy.visit("/posts")
            cy.get("[data-cy=post]").should("contain.text", "edited post")
        })

    describe("when logged in user is not the author", () => {
        beforeEach(() => {
            cy.signup("anotherone@example.com", "password", "another")
            cy.login("anotherone@example.com", "password")
        })
        it("does not have an edit post form", () => {
            cy.contains("My Test Post").click()
            cy.get("[data-cy=editPostForm]").should('not.exist')
        })
    })
});