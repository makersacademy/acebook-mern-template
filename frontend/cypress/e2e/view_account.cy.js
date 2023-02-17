import 'cypress-file-upload';

describe('Visiting account page', () => {
  beforeEach(() => {
    cy.signup('useraccount@email.com', '12345678');
  });

  it('Can visit account page', () => {
    cy.login('useraccount@email.com', '12345678');
    cy.visit('/account');
    cy.get('h2').contains('Edit your Account Details');
  });


  it('it display edit buttons', () => {
    cy.login('useraccount@email.com', '12345678');
    cy.visit('/account');
    cy.get('button').contains('Edit display name');
    cy.get('button').contains('Edit email');
    cy.get('button').contains('Edit bio');
    cy.get('button').contains('Upload image');
    cy.get('button').contains('Edit password');
  });

  it('changes display name', () => {
    cy.login('useraccount@email.com', '12345678');
    cy.visit('/account');
    cy.get('#display-button').click();
    cy.get('input[placeholder*="New display name"]').type('testing testing');

    cy.on('window:alert', (t) => {
      expect(t).to.contains('display changed');
    });
  });


  // it('changes email', () => {
  //   cy.login('useraccount@email.com', '12345678');
  //   cy.visit('/account');
  //   cy.get('#email-button').click();
  //   cy.get('input[placeholder*="New email"]').type('testing@testing.com');
  //   cy.get('#submit-button').click();

  //   cy.on('window:alert', (t) => {
  //     expect(t).to.contains('email changed');
  //   });
  //   cy.visit('/posts');

  //   cy.get('#avatar-img').click();
  //   cy.get('#logout-button').click();

  //   cy.visit('/login');
  //   cy.get('#email').type('testing@testing.com');

  //   cy.get('#password').type('12345678');
  //   cy.get('#submit').click();
  //   cy.get('input[placeholder*="Whats on your mind?"]');
  //   cy.get('h2').contains('Posts');

  //   cy.visit('/account');
  //   cy.get('#email-button').click();
  //   cy.get('input[placeholder*="New email"]').type('useraccount@email.com');
  //   cy.get('#submit-button').click();
  // });

  // it('changes password', () => {
  //   cy.login('useraccount@email.com', '12345678');
  //   cy.visit('/account');
  //   cy.get('#password-button').click();
  //   cy.get('input[placeholder*="New password"]').type('testing');
  //   cy.get('#submit-button').click();

  //   cy.on('window:alert', (t) => {
  //     expect(t).to.contains('password changed');
  //   });
  //   cy.visit('/posts');
  //   cy.get('#logout-button').click();
  //   cy.visit('/login');
  //   cy.get('#email').type('useraccount@email.com');

  //   cy.get('#password').type('testing');
  //   cy.get('#submit').click();
  //   cy.get('input[placeholder*="Whats on your mind?"]');
  //   cy.get('h2').contains('Posts');

  //   cy.visit('/account');
  //   cy.get('#password-button').click();
  //   cy.get('input[placeholder*="New password"]').type('12345678');
  //   cy.get('#submit-button').click();
  // });

  it('changes bio', () => {
    cy.login('useraccount@email.com', '12345678');
    cy.visit('/account');
    cy.get('#bio-button').click();
    cy.get('input[placeholder*="New bio"]').type('testing');

    cy.on('window:alert', (t) => {
      expect(t).to.contains('bio changed');
    });
  });

  it('uploads new profile image', () => {
    cy.login('useraccount@email.com', '12345678');
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
