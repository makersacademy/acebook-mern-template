import AddComment from "./AddComment";

describe("AddComment", () => {
  it("creates a new comment within a post", () => {
    window.localStorage.setItem("token", "fakeToken")
    
    cy.mount(<AddComment post={ {_id: "mockHexPostID" }} />);

    cy.intercept('POST', '/posts/mockHexPostID', {
      statusCode: 200,
      body: {
        comment: 'The comment under Hello FarceBook',
        author: 'testuser',
        token: "fakeReturnedToken" // do we need to simulate the JSON response with a token?
      },
    }).as('newCommentRequest'); 

    // cy.get('#comment').type('text');
    cy.get('[data-cy="comment"]').type('text');
    // cy.get('#submit-comment').click();
    cy.get('[data-cy="submit"]').click();

    cy.wait('@newCommentRequest').then((interception) => {
      expect(interception.response.body.comment).to.eq('The comment under Hello FarceBook');
    });
  })
})