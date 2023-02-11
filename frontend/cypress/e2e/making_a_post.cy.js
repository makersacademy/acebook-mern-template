describe('Creating a post', () => {
  before(() => {
    cy.signup('user@email.com', '12345678');
  });

  it('log in and then create a new post should return a feed containing new post', () => {
    cy.login('user@email.com', '12345678');
    cy.url().should('include', '/posts');
    cy.get('#post-input').type('Hello world');
    cy.get('#submit').click();
    cy.visit('/posts');
    cy.contains('Hello world');
  });
});
