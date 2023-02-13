import CreatePost from './CreatePost'

describe('CreatePost', () => {
    it('adds a new post', () => {
      cy.mount(<CreatePost />);

      cy.intercept('POST', '/posts', { 
        statusCode: 200,
        body: {
            message: 'test new post'
        }
      }).as("postRequest")

      cy.get("#newpost").type('test new post');
      cy.get("#submit").click();
      cy.wait('@postRequest').then(() => {

        cy.get('[data-cy="post"]').should('contain.text', "test new post")
      })
      
    });
});