import AddComment from "./AddComment";

const mockPost =
  {
    _id: 1, 
    message: "Hello, world",
    authorUserID: {
                    username: "Cypress",
                    _id: "mockHexUserObjectID",
                    email: "cypress@hill.com",
                  },
    createdAt: "2023-05-11T14:09:31.064+00:00",
    comments: [{comment: "fee", author: "fi"}, {comment: "fo", author: "fum"} ]
  }

describe("AddComment", () => {
  it("creates a new comment within a post", () => {
    window.localStorage.setItem("token", "fakeToken")
    
    // cy.mount(<AddComment post={ {_id: "mockHexPostID" }} />);
    cy.mount(<AddComment post = { _id: "mockHexPostID" } />);

    cy.intercept('PATCH', '/posts/1', {
      statusCode: 200,
      body: {
        comment: 'The comment under Hello FarceBook',
        author: 'testuser',
        token: "fakeReturnedToken" // do we need to simulate the JSON response with a token?
      },
    }).as('newCommentRequest'); 

    cy.get('[data-cy="comment"]').type('text');
    cy.get('[data-cy="submit"]').click();

    cy.wait('@newCommentRequest').then((interception) => {
      expect(interception.response.body.comment).to.eq('The comment under Hello FarceBook');
    });
  })
})