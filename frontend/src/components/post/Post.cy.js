import Post from './Post'

describe("Post", () => {
  it('renders a post with a message', () => {
    cy.mount(<Post post={{_id: 1, message: "Hello, world"}} />);
    cy.get('[data-cy="post"]').should('contain.text', "Hello, world")
  })
  it('renders the newest posts first', () => {
    cy.mount(<Post post={{_id: 1, message: "Hello, world"}} />);
    cy.mount(<Post post={{_id: 2, message: "Another hello, world"}} />);
    cy.get('[data-cy="post"]').should('contain.text', "Another hello, world")
  })

})
