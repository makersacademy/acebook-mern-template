import Form from './form';
import 'cypress-file-upload';

let setShowForm = () => {};
describe('Rendering forms', () => {
  it('Displays password form', () => {
    window.localStorage.setItem('token', 'fakeToken');
    cy.mount(<Form form_type={'password'} />);
    cy.get('input[placeholder*="New password"]').type('testing testing');
  });
  it('Displays display name form', () => {
    window.localStorage.setItem('token', 'fakeToken');
    cy.mount(<Form form_type={'display'} />);
    cy.get('input[placeholder*="New display name"]').type('testing testing');
  });
  it('Displays email form', () => {
    window.localStorage.setItem('token', 'fakeToken');
    cy.mount(<Form form_type={'email'} />);
    cy.get('input[placeholder*="New email address"]').type('testing testing');
  });
  it('Displays bio form', () => {
    window.localStorage.setItem('token', 'fakeToken');
    cy.mount(<Form form_type={'bio'} />);
    cy.get('input[placeholder*="New bio"]').type('testing testing');
  });
  it('Displays image form', () => {
    window.localStorage.setItem('token', 'fakeToken');
    cy.mount(<Form form_type={'image'} />);
    cy.get('input[type=file]').selectFile(
      './src/components/account/form/test-image.png'
    );
  });
  it('Updates password', () => {
    window.localStorage.setItem('token', 'fakeToken');

    cy.mount(<Form form_type={'password'} setShowForm={setShowForm} />);
    cy.get('input[placeholder*="New password"]').type('new-password');
    cy.get('button[type=submit]').click();

    cy.on('window:alert', (t) => {
      expect(t).to.contains('password changed');
    });
  });
  it('Updates display name', () => {
    window.localStorage.setItem('token', 'fakeToken');

    cy.mount(<Form form_type={'display'} setShowForm={setShowForm} />);
    cy.get('input[placeholder*="New display name"]').type('new-display');
    cy.get('button[type=submit]').click();

    cy.on('window:alert', (t) => {
      expect(t).to.contains('display changed');
    });
  });
  it('Updates email', () => {
    window.localStorage.setItem('token', 'fakeToken');

    cy.mount(<Form form_type={'email'} setShowForm={setShowForm} />);
    cy.get('input[placeholder*="New email address"]').type('new-email');
    cy.get('button[type=submit]').click();

    cy.on('window:alert', (t) => {
      expect(t).to.contains('email changed');
    });
  });
  it('Updates bio', () => {
    window.localStorage.setItem('token', 'fakeToken');

    cy.mount(<Form form_type={'bio'} setShowForm={setShowForm} />);
    cy.get('input[placeholder*="New bio"]').type('new-bio');
    cy.get('button[type=submit]').click();

    cy.on('window:alert', (t) => {
      expect(t).to.contains('bio changed');
    });
  });
  it('Updates image', () => {
    window.localStorage.setItem('token', 'fakeToken');

    cy.mount(<Form form_type={'image'} setShowForm={setShowForm} />);
    const fixtureFile = 'photo.png';
    cy.get('input[type=file').attachFile(fixtureFile);
    cy.get('button[type=submit]').click();

    cy.on('window:alert', (t) => {
      expect(t).to.contains('image changed');
    });
  });
});
