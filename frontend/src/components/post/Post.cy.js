import Post from './Post'

describe("Post", () => {
  it('renders a post with a message', () => {
    cy.mount(<Post post={{_id: 1, message: "Hello, world"}} />);
    cy.get('[data-cy="post"]').should('contain.text', "Hello, world")
  })

  it('renders a post with a created datetime', () => {
    const currentDateTime = new Date().toISOString()
    cy.mount(<Post post={{_id: 1, message: "Hello, world", createdDateTime: currentDateTime}} />);
    cy.get('[data-cy="post"]').should('contain.text', currentDateTime)
  })
})
