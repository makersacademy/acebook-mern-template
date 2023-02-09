import { MemoryRouter } from 'react-router-dom'
import Navbar from './Navbar'

describe("Navbar", () => {
  it("sees all div", () => {
    cy.mount(<MemoryRouter><Navbar/></MemoryRouter>)
    
    cy.get('div')
    .should('be.visible')
  });
});


// Cypress Recorder:
// cy.visit('http://localhost:3000/posts');
// cy.get('#post-input').click();
// cy.get('#post-input').type('{backspace}');
// cy.get('#post-input').type('Hello world!');
// cy.get('#submit').click();
// cy.get('form').submit();
// cy.get('#email').click();
// cy.get('#email').type('ju@email.com');
// cy.get('#password').type('Makers22');
// cy.get('#submit').click();
// cy.get('form').submit();
// cy.get('#post-input').click();
// cy.get('#post-input').type('Hello world!');
// cy.get('#submit').click();
// cy.get('form').submit();
// cy.get('li:nth-child(1) > a').click();
// cy.get('li:nth-child(2) > a').click();
// cy.get('.Navbar_profile__PZm7V img').click();