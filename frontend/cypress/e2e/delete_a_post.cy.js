describe('Deleting a post', () => {
    it('signs up', () => {
      cy.signup("update@test.com", "update")
    })
  
    it('should make a post when user is logged in', () => {
      cy.login("update@test.com", "update");
      cy.url().should("include", "/posts");
      cy.visit('/create-post');
      cy.url().should("include", "/create-post");
      cy.get('#message').type('quacky');
      cy.get('#submit').click();
      cy.url().should("include", "/posts");
      cy.contains('quacky');
      cy.get('#delete-link').click();
      
      cy.get('#submit').click();
      cy.url().should("include", "/posts");
      cy.contains('quacky').should('not.exist');
    })
  })