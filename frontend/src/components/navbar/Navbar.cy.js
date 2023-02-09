import { MemoryRouter } from 'react-router-dom'
import Navbar from './Navbar'

describe("Navbar", () => {
  it("sees all div", () => {
    cy.mount(<MemoryRouter><Navbar/></MemoryRouter>)
    
    cy.get('div')
    .should('be.visible')
  });

  it("clicks Acebook logo", () => {
    cy.mount(<MemoryRouter><Navbar/></MemoryRouter>)
    
    cy.get('a')
    .eq(0).click();
  });

  it("clicks Account logo", () => {
    cy.mount(<MemoryRouter><Navbar/></MemoryRouter>)
    
    cy.get('a')
    .eq(3).click();
  });
});