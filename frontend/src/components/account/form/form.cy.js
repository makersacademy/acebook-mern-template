import Form from './form';

describe('Rendering forms', () => {
  it('Displays password form', () => {
    window.localStorage.setItem('token', 'fakeToken');

    cy.mount(<Form form_type={'password'} />);

    cy.get('input').value('New password');
  });
});
