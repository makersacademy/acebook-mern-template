import AddComment from "./AddComment";
describe("AddComment", () => {
  xit("creates a new comment within a post", () => {
    // simulate user being logged in
    window.localStorage.setItem("token", "fakeToken")
    
    cy.mount(<AddComment post={ {_id: "mockHexPostID" }} />);

    cy.intercept('PATCH', '/posts/mockHexPostID', {
      statusCode: 200,
      body: {
        comment: 'The comment under Hello FarceBook',
        author: 'testuser',
      },
    }).as('newCommentRequest'); 

    cy.get('[data-cy="comment"]').type('text');
    cy.get('[data-cy="submit"]').click();

    cy.wait('@newCommentRequest').then((interception) => {
      expect(interception.response.body.comment).to.eq('The comment under Hello FarceBook');
    });
  })
})