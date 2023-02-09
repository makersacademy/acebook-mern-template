describe("Signing up", () => {
it("tests to see if the post button and box works properly", () => {
    // need to login in from the login page
    cy.visit('http://localhost:3000/signup');
    cy.get('#email').click();
    cy.get('#email').type('james@jamesmail.com');
    cy.get('#password').type('password1234');
    cy.get('#firstName').type('james');
    cy.get('#lastName').type('james');
    cy.get('#submit').click();
    cy.get('form').submit();
    cy.get('#email').click();
    cy.get('#email').type('james@jamesmail.com');
    cy.get('#password').type('password1234');
    cy.get('#submit').click();
    cy.get('form').submit();
    cy.get('#message').click();
    cy.get('#message').type('cypress test 2');
    cy.get('#submit').click();
    cy.url().should('contains', 'http://localhost:3000/posts');
    
    // cy.get('#feed').should('contains', 'cypress test 2')
  })
})
