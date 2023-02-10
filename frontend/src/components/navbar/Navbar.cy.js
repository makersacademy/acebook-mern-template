import { MemoryRouter } from 'react-router-dom'
import Navbar from './Navbar'

describe("Navbar", () => {
  //#1
  it("sees all div", () => {
    cy.mount(<MemoryRouter><Navbar/></MemoryRouter>)
    
    cy.get('div')
    .should('be.visible');
  });

  //#2
  it("clicks Acebook logo", () => {
    cy.mount(<MemoryRouter><Navbar/></MemoryRouter>)
    
    cy.get('a')
    .eq(0).click();
  });

  //#3
  it("clicks Account logo", () => {
    cy.mount(<MemoryRouter><Navbar/></MemoryRouter>)
    
    cy.get('a')
    .eq(3).click();
  });

  //#4
  it("finds Acebook logo", () => {
    cy.mount(<MemoryRouter><Navbar/></MemoryRouter>)
    
    cy.get('a')
    .eq(0).find('img');
  });

  //#5
  it("finds Account logo", () => {
    cy.mount(<MemoryRouter><Navbar/></MemoryRouter>)
    
    cy.get('a')
    .eq(3).find('img');
  });

  //#6
  it("confirms that Acebook-Air does not contain any undefined link", () => {
    cy.mount(<MemoryRouter><Navbar/></MemoryRouter>)
    
    cy.contains('a', 'Acebook-Air').should('not.have.attr', 'href', '#undefined');
  });

  //#7
  it("confirms that Acebook-Air contains the right link '/posts'", () => {
    cy.mount(<MemoryRouter><Navbar/></MemoryRouter>)
    
    cy.contains('a', 'Acebook-Air').should('have.attr', 'href', '/posts');
  });
});