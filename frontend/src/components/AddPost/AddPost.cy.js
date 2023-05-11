import AddPost from './AddPost';
const navigate = () => {};

describe('AddPost', () => {
  it('returns a ', () => {
    cy.mount(<AddPost navigate={navigate} />);

    cy.intercept('POST', '/posts', {
      statusCode: 201,
      body: {
        message: 'Hello FarceBook',
      },
    }).as('newPostRequest');

    cy.get('#message').type('text');
    cy.get('#submit').click();

    cy.wait('@newPostRequest').then((interception) => {
      expect(interception.response.body.message).to.eq('Hello FarceBook');
    });
  });
});

