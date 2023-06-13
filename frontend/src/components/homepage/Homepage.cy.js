import Homepage from "./Homepage";
const navigate = () => {}

describe("Visiting the homepage", () => {
  it("should show the log in / sign up buttons if not logged in", () => {
    cy.mount(<Homepage navigate={navigate} />)

    cy.get("#login-btn").should("be.visible")
    .should('contain.text', "Log in!")

    cy.get("#signup-btn").should("be.visible")
    .should('contain.text', "Sign up!")
  })
})