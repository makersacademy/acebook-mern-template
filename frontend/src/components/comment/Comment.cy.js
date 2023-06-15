import Comment from './Comment'

describe("Comment", () => {
  it('renders a comment with a message', () => {
    cy.mount(<Comment comment={{_id: 1, username: 'user', message: "Hello, world"}} />);
    cy.get('[data-cy="comment-container"]').should('contain.text', "Hello, world");
  })

  it('renders a comment with a username', () => {
    cy.mount(<Comment comment={{_id: 1, username: 'user', message: "Hello, world"}} />);
    cy.get('[data-cy="comment-container"]').should('contain.text', "user");
  })
})