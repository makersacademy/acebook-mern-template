import Form from './form';

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
    cy.mount(<Form form_type={'password'} />);
    cy.get('input[placeholder*="New password"]').type('new-password');
    cy.get('button[type=submit]').click();
  });
});
