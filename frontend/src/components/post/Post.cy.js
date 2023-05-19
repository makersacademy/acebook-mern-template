import Post from './Post'

describe("Post", () => {
  it('renders a post with a message', () => {
    // mock post object must have same structure as Post.js expects 
    cy.mount(<Post post={{
      _id: 1,
      message: "Hello, world",
      createdAt: "2023-05-11T14:09:31.064+00:00",
      author: "Cypress",
      comments: [{comment: "fee", author: "fi"}]
    }} />);
    cy.get('[data-cy="post"]').should('contain.text', "Hello, world")
  })
})
