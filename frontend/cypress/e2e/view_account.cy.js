describe('Visiting account page', () => {
  beforeEach(() => {
    cy.signup('user@email.com', '12345678');
    cy.login('user@email.com', '12345678');
  });

  it('Can visit account page', () => {
    cy.visit('/account');
    cy.get('h2').contains('Welcome');
  });

  it('it display edit buttons', () => {
    cy.visit('/account');
    cy.get('button').contains('Edit display name');
    cy.get('button').contains('Edit email');
    cy.get('button').contains('Edit bio');
    cy.get('button').contains('Upload image');
    cy.get('button').contains('Edit password');
  });
});
