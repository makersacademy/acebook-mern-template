describe('Making a post', () => {
  
  beforeEach(() => {
    cy.signup("duck@pond.com", "Il0veBread")
    cy.login("duck@pond.com", "Il0veBread")
  });

  it('should make a post when user is logged in', () => {
    cy.visit('/create-post');
    cy.get('#message').type('ducklings');
    cy.get('#submit').click();
    cy.contains('ducklings');
    cy.url().should("include", "/posts");
  })

  it('should post two posts and they should both be in the feed', () => {
    cy.visit('/create-post');
    cy.get('#message').type('duck');
    cy.get('#submit').click();
    cy.visit('/create-post');
    cy.get('#message').type('goose');
    cy.get('#submit').click();
    cy.contains('duck');
    cy.contains('goose');
  })
});