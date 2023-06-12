import CreatePostForm from "./CreatePostForm";
const navigate = () => {}

describe("Creating a post", () => {
  it("should show the form", () => {
    cy.mount(<CreatePostForm navigate={navigate} />)

    cy.get("form").should("be.visible")
    cy.intercept('POST', '/posts', { message: "quack quack" }).as('postRequest')

    cy.get("#message").type("quack quack")
    cy.get("#submit").click()
    cy.wait('@postRequest').then( interception => {
        expect(interception.response.body.message).to.eq("quack quack")
    })
  })
})