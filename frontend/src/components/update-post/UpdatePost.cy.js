import UpdatePost from "./UpdatePost";
const navigate = () => {}

describe("Visiting the update page", () => {
  it("should show the form to update a post", () => {
    cy.mount(<UpdatePost navigate={navigate} />)

    cy.get("form").should("be.visible")

    cy.get("#submit").should("be.visible")
  })
})