import 'cypress-file-upload';

describe('Visiting account page', () => {
  beforeEach(() => {
    cy.signup('user@email.com', '12345678');
    cy.login('user@email.com', '12345678');
  });

  it('Can visit account page', () => {
    cy.visit('/account');
    cy.get('h2').contains('Edit your Account Details');
  });
  it('changes display name', () => {
    cy.visit('/account');
    cy.get('#display-button').click();
    cy.get('input[placeholder*="New display name"]').type('testing testing');

    cy.on('window:alert', (t) => {
      expect(t).to.contains('display changed');
    });
  });
  it('changes email', () => {
    cy.visit('/account');
    cy.get('#email-button').click();
    cy.get('input[placeholder*="New email"]').type('testing@testing.com');
    cy.get('#submit-button').click();

    cy.on('window:alert', (t) => {
      expect(t).to.contains('email changed');
    });
    cy.visit('/posts');
    cy.get('#logout-button').click();
    cy.visit('/login');
    cy.get('#email').type('testing@testing.com');

    cy.get('#password').type('12345678');
    cy.get('#submit').click();
    cy.get('input[placeholder*="Whats on your mind?"]');
    cy.get('h2').contains('Posts');

    cy.visit('/account');
    cy.get('#email-button').click();
    cy.get('input[placeholder*="New email"]').type('user@email.com');
    cy.get('#submit-button').click();
  });

  it('changes password', () => {
    cy.visit('/account');
    cy.get('#password-button').click();
    cy.get('input[placeholder*="New password"]').type('testing');
    cy.get('#submit-button').click();

    cy.on('window:alert', (t) => {
      expect(t).to.contains('password changed');
    });
    cy.visit('/posts');
    cy.get('#logout-button').click();
    cy.visit('/login');
    cy.get('#email').type('user@email.com');

    cy.get('#password').type('testing');
    cy.get('#submit').click();
    cy.get('input[placeholder*="Whats on your mind?"]');
    cy.get('h2').contains('Posts');

    cy.visit('/account');
    cy.get('#password-button').click();
    cy.get('input[placeholder*="New password"]').type('12345678');
    cy.get('#submit-button').click();
  });

  it('changes bio', () => {
    cy.visit('/account');
    cy.get('#bio-button').click();
    cy.get('input[placeholder*="New bio"]').type('testing');

    cy.on('window:alert', (t) => {
      expect(t).to.contains('bio changed');
    });
  });

  it('uploads new profile image', () => {
    cy.visit('/account');
    cy.get('#image-upload-button').click();
    const fixtureFile = 'photo.png';
    cy.get('input[type=file').attachFile(fixtureFile);
    cy.get('button[type=submit]').click();
    cy.on('window:alert', (t) => {
      expect(t).to.contains('image changed');
    });
  });
});
