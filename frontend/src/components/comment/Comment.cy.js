import Comment from './Comment'

describe("Comment", () => {
  it('renders a comment with a message', () => {
    cy.mount(<Comment comment={{_id: 1, comment: "Hello, world", author: "steve"}} />);
    cy.get('[data-cy="comment"]').should('contain.text', "Hello, world")
    cy.get('[data-cy="comment"]').should('contain.text', "steve")
  })
})