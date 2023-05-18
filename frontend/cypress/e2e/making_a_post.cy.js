describe('making a post', () => {
  before(() => {
    cy.signup("lester@rollingstone.com", "testerbangs", "Password1234")
  })
  
  it('when logged in, user can make a post and see it appear on the page', () => {
    // make this into a cypress custom function
    cy.visit("/login");
    cy.get("#username").type("testuser");
    cy.get("#password").type("Password1234");
    cy.get("#submit").click();

    cy.get("#message").type("cypress end to end testing is so much fun");
    cy.get("#submit").click();

    cy.get("#feed").should('contain.text', "cypress end to end testing is so much fun")
    

  })
})