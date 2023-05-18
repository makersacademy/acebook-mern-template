import AddPost from './AddPost';
// const navigate = () => {};

describe('AddPost', () => {
  it('creates a new post', () => {
    window.localStorage.setItem("token", "fakeToken")
    
    cy.mount(<AddPost onPostAdded={() => {}}/>);

    cy.intercept('POST', '/posts', {
      statusCode: 201,
      body: {
        message: 'Hello FarceBook',
        comments: []
      },
    }).as('newPostRequest');

    cy.get('#message').type('text');
    cy.get('#message').should('have.value', 'text');
    cy.get('#submit').click();

    cy.wait('@newPostRequest').then((interception) => {
      expect(interception.response.body.message).to.eq('Hello FarceBook');
    });
  });
});

