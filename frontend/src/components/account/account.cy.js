import Account from './account';
import { MemoryRouter } from 'react-router';
const navigate = () => {};

describe('Visiting account page', () => {
  it('Can visit account page', () => {
    window.localStorage.setItem('token', 'fakeToken');

    cy.mount(<MemoryRouter><Account navigate={navigate} /></MemoryRouter>);

    cy.get('h2').contains('Edit your Account Details');
  });

  describe('it display edit buttons', () => {
    window.localStorage.setItem('token', 'fakeToken');
    it("finds upload img button", () => {
      cy.mount(<MemoryRouter><Account/></MemoryRouter>)
      
      cy.get('[alt="upload image button"]');
    });

    it("finds bio button", () => {
      cy.mount(<MemoryRouter><Account/></MemoryRouter>)
      
      cy.get('[alt="bio button"]');
    });
  });
});