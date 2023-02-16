import Post from './Post'

describe("Post", () => {
  it('renders a post with a message and a comment link with number 2', () => {
    cy.mount(<Post post={{_id: 1, message: "Hello, world", comments:[1,2]}} />);
    cy.get('[data-cy="post"]').should('contain.text', "Hello, world");
    cy.get('[data-cy="comments-link"]').should('contain.text', 'Comments: 2')
  })
})
