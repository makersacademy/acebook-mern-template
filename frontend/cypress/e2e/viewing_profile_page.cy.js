describe('Visiting profile page', () => {
  before(() => {
    cy.signup('user100@email.com', '12345678');
  });

  it('Can visit profile page', () => {
    cy.login('user100@email.com', '12345678');
    cy.visit('/profile');
    cy.get('h2').contains('Profile');
  });
});
