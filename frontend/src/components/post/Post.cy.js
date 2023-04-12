import Post from './Post'

describe("Post", () => {
  it('renders a post with a message', () => {
    cy.mount(<Post post={{_id: 1, message: "Hello, world", user: "sarah"}} />);
    cy.get('[data-cy="post"]').should('contain.text', "Hello, world", "sarah")
  })

  // it('renders a comment with a message', () => {
  //   cy.mount(<Post post={{_id: 1, message: "This comment", user: "sarah"}} />);
  //   cy.get('[data-cy="comment"]').should('contain.text', "This, is, a, comment", "sarah")
  // })
})
