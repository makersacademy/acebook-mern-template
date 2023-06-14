import Navbar from "./navbar";
const navigate = () => {}

describe("Seeing the Navbar", () => {
  it("should show the log in / sign up buttons if not logged in", () => {
    cy.mount(<Navbar navigate={navigate} />)

    cy.get("#login-btn").should("be.visible")
    .should('contain.text', "Log in!")

    cy.get("#signup-btn").should("be.visible")
    .should('contain.text', "Sign up!")
  })
})