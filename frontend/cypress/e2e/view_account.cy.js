describe('Visiting account page', () => {
  beforeEach(() => {
    cy.signup('user@email.com', '12345678');
    cy.login('user@email.com', '12345678');
  });

  it('Can visit account page', () => {
    cy.visit('/account');
    cy.get('h2').contains('Welcome');
  });
});
