import NavBar from './NavBar'
import { MemoryRouter } from 'react-router-dom';

const navigate = () => {};


describe("NavBar", () => {
  it("displays the Acebook logo", () => {
    cy.mount(<MemoryRouter><NavBar/></MemoryRouter>);
    cy.get('[data-cy="logo-container"]')
    .find("img").should('be.visible');
  });

  it("displays link to log out", () => {
    cy.mount(<MemoryRouter><NavBar/></MemoryRouter>);
    cy.get('[data-cy="menu-container"]')
    .should('contains.text', "Log out");
  });

  it("displays link to feed", () => {
    cy.mount(<MemoryRouter><NavBar/></MemoryRouter>);
    cy.get('[data-cy="menu-container"]')
    .should('contain.text', "Feed");
  });

  it("displays link to create a post", () => {
    cy.mount(<MemoryRouter><NavBar/></MemoryRouter>);
    cy.get('[data-cy="menu-container"]')
    .should('contain.text', "Create a post");
  });
});
