import Post from './Post'

describe("Post", () => {
  it('renders a post with a message', () => {
    cy.mount(<Post post={{_id: 1, message: "Hello, world", createdAt: "3-10-2023" }} />);
    cy.get('[data-cy="post"]').should('contain.text', "Hello, world")
    cy.get('[data-cy="post"]').should('contain.text', "10-3-2023")
  })
})
