import TokenGenerator from "../../../api/lib/token_generator";

describe("Displaying users account info", () => {
    

    beforeEach(() => {
        cy.login("someone@example.com", "password")
        cy.visit("/posts");
    });

    it("shows username and email if user authorised", () => {
        let user_id = window.localStorage.getItem("userId") ;
        cy.visit(`/users/${user_id}`)
        cy.contains('usernamename')
    })
})
