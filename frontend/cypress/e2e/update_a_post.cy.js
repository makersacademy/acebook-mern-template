describe('Updating a post', () => {
  it('signs up', () => {
    cy.signup("update@test.com", "update")
  })

  it('should make a post when user is logged in', () => {
    cy.login("update@test.com", "update");
    cy.url().should("include", "/posts");
    cy.visit('/create-post');
    cy.url().should("include", "/create-post");
    cy.get('#message').type('ducklings');
    cy.get('#submit').click();
    cy.url().should("include", "/posts");
    cy.contains('ducklings');
    cy.get('#view-post-link').click();
    cy.get('#update-link').click();
    
    cy.get('#message').type('new message');
    cy.get('#submit').click();
    cy.url().should("include", "/posts");
    cy.contains('new message');
  })
})
