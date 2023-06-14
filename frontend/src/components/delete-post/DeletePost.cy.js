import DeletePost from './DeletePost'
const navigate = () => {}

describe("Visiting the delete page", () => {
  it("should show the form to delete a post", () => {
    cy.mount(<DeletePost navigate={navigate} />)
  
    cy.get("form").should("be.visible")
  
    cy.get("#submit").should("be.visible")
  })
})