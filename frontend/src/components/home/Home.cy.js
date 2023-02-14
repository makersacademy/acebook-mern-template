import { MemoryRouter } from 'react-router-dom'
import Home from './Home'

describe("Home", () => {
  //#1
  it("confirms that Acebook-Air contains the string Welcome to Acebook", () => {
    cy.mount(<MemoryRouter><Home/></MemoryRouter>)

    cy.get('h2').contains('Welcome to Acebook')
  });

  //#2
  it("confirms that Login contains the right link to '/login'", () => {
    cy.mount(<MemoryRouter><Home/></MemoryRouter>)
    
    cy.contains('a', 'Login').should('have.attr', 'href', '/login');
  });

  //#3
  it("confirms that Sign Up contains the right link to '/signup'", () => {
    cy.mount(<MemoryRouter><Home/></MemoryRouter>)
    
    cy.contains('a', 'Sign Up').should('have.attr', 'href', '/signup');
  });

  //#4
  it("finds Welcome img", () => {
    cy.mount(<MemoryRouter><Home/></MemoryRouter>)
    
    cy.get('div').find('img');
  });
});