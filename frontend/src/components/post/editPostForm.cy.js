import EditPostForm from "./editPostForm"

describe("editPost", () => {
  it('renders a form to edit a post', () => {
    cy.mount(<EditPostForm/>);
    cy.get('form').contains('Message:')
    cy.get('input[type="text"]').should('exist')
    cy.get('form').contains('Submit')
})

})