describe('Deleting a post', () => {
    it('signs up', () => {
      cy.signup("update@test.com", "update")
    })
  
    it('should make a post when user is logged in', () => {
      cy.login("update@test.com", "update");
      cy.url().should("include", "/posts");
      cy.visit('/create-post');
      cy.url().should("include", "/create-post");
      cy.get('#message').type('quack-test');
      cy.get('#submit').click();
      cy.url().should("include", "/posts");
      cy.contains('quack-test');
      cy.get('#delete-link').click();
      
      cy.get('#submit').click();
      cy.url().should("include", "/posts");
      cy.contains('quack-test').should('not.exist');
    })
  })