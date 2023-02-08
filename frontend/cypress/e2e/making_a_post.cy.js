describe('Creating a post', () => {
  before(() => {
    cy.signup('user@email.com', '12345678');
  });

  it('log in and then create a new post should return submitted post window', () => {
    cy.visit('/login');
    cy.get('#email').type('someone@example.com');
    cy.get('#password').type('password');
    cy.get('#submit').click();
    cy.url().should('include', '/posts');
    cy.get('#post-input').type('Hello world');
    cy.get('#submit').click();
    cy.on('window:alert', (txt) => {
      expect(txt).to.contains('Post submitted');
    });
  });
  it('log in and then create a new post should return a feed containing new post', () => {
    cy.visit('/login');
    cy.get('#email').type('someone@example.com');
    cy.get('#password').type('password');
    cy.get('#submit').click();
    cy.url().should('include', '/posts');
    cy.get('#post-input').type('Hello world');
    cy.get('#submit').click();
    cy.on('window:alert', (txt) => {
      expect(txt).to.contains('Post submitted');
    });
    cy.visit('/posts');
    cy.contains('Hello world');
  });
});
