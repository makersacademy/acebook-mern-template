describe('Making a post', () => {

  before(() => {
    cy.signup("user@email.com", "12345678")
    cy.login("user@email.com", "12345678")
  })

  it("allows the user to make a new post which appears in the feed", () => {
    cy.visit("/posts");
    cy.get('#new-post-field').type("I'm making a new post");
    cy.get('#new-post-button').click();

    cy.get('[data-cy="post"]').should('contain.text', "I'm making a new post");
  })
})
