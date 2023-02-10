import Post from './Post'

describe("Post", () => {
  it('renders a post with a message', () => {
    cy.mount(<Post post={{_id: 1, message: "Hello, world"}} />);
    cy.get('[data-cy="post"]').should('contain.text', "Hello, world")
  })

  it('renders a post with a message and username', () => {
    cy.mount(<Post post={{_id: 1, message: "Hello, world", author: "Alex Bodian"}} />);
    cy.get('[data-cy="post"]').should('contain.text', "Hello, world")
    cy.get('[data-cy="post"]').should('contain.text', "Alex Bodian")
  })
})
