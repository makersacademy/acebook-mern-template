describe('Making a post', () => {
  
  // beforeEach(() => {
  //   cy.signup("duck@pond.com", "Il0veBread")
  //   cy.login("duck@pond.com", "Il0veBread")
  // });
  it('signs up', () => {
    cy.signup("duck@pond.com", "Il0veBread")
  })

  it('should make a post when user is logged in', () => {
    cy.login("duck@pond.com", "Il0veBread");
    cy.url().should("include", "/posts");
    cy.get('#create-post-button').click();
    cy.url().should("include", "/create-post");
    cy.get('#message').type('ducklings');
    cy.get('#submit').click();
    cy.url().should("include", "/posts");
    cy.contains('ducklings');
  })
  
  it('should post two posts and they should both be in the feed', () => {
    cy.login("duck@pond.com", "Il0veBread");
    cy.url().should("include", "/posts");
    cy.visit('/create-post');
    cy.url().should("include", "/create-post");
    cy.get('#message').type('duck');
    cy.get('#submit').click();
    cy.url().should("include", "/posts");
    cy.visit('/create-post');
    cy.url().should("include", "/create-post");
    cy.get('#message').type('goose');
    cy.get('#submit').click();
    cy.url().should("include", "/posts");
    cy.contains('duck');
    cy.contains('goose');
  })
});