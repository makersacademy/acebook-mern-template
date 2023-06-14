import Post from './Post'

describe("Post", () => {
  it('renders a post with a message', () => {
    cy.mount(<Post post={{_id: 1, message: "Hello, world", likedByUsers: []}} />);
    cy.get('[data-cy="post"]').should('contain.text', "Hello, world")
  })

  it('renders a post with initial likes equal to 0', () => {
    cy.mount(<Post post={{_id: 1, message: "Hello, world", likedByUsers: []}} />);
    cy.get('[data-cy="post"]').should('contain.text', "Likes: 0")
  })
})
