import Account from './account';
const navigate = () => {};

describe('Visiting account page', () => {
  it('Can visit account page', () => {
    window.localStorage.setItem('token', 'fakeToken');

    cy.mount(<Account navigate={navigate} />);

    cy.get('h2').contains('Welcome');
  });

  it('it display edit buttons', () => {
    window.localStorage.setItem('token', 'fakeToken');

    cy.mount(<Account navigate={navigate} />);

    cy.get('button').contains('Edit display name');
    cy.get('button').contains('Edit email');
    cy.get('button').contains('Edit bio');
    cy.get('button').contains('Upload image');
    cy.get('button').contains('Edit password');
  });
});
//   xit('sends put request to endpoint', () => {
//     cy.mount(<Account navigate={navigate} />);
//     window.localStorage.setItem('token', 'fakeToken');
//     cy.intercept("PUT, '/tokens", { token: 'fakeToken' }.as(''));
//   });
// });
