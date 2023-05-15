import AddComment from "./AddComment";

describe("AddComment", () => {
  it("creates a new comment within a post", () => {
    cy.mount(<AddComment />);

    cy.intercept('POST', '/posts', {
      statusCode: 201,
      body: {
        comment: 'The comment under Hello FarceBook',
      },
    }).as('newCommentRequest');

    cy.get('#comment').type('text');
    cy.get('#submit').click();

    cy.wait('@newCommentRequest').then((interception) => {
      expect(interception.response.body.comment).to.eq('The comment under Hello FarceBook');
    });
  })
})