import Post from './Post'

describe("Post", () => {
  it('renders a post with a message', () => {
    cy.mount(<Post post={{id: 1, message: "This is my first post"}} />);
    cy.get('[data-cy="post"]').should('contain.text', "This is my first post")
  })
})
