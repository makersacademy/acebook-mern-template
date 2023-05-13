describe('Making a post', () => {

  before(() => {
    cy.signup("user@email.com", "12345678")
    cy.visit("/")
  })
})
