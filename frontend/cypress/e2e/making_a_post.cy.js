describe('Making a post', () => {
  
  beforeEach(() => {
    cy.login("user@email.com", "12345678")
  });

  it('should make a post when user is logged in', () => {
    cy.visit('/create-post');
    cy.get('#message').type('quack quack quack');
    cy.get('#submit').click();
    cy.contains('quack quack quack');
    cy.url().should("include", "/posts");
  })
});