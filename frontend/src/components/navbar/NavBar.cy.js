import NavBar from './NavBar'
const navigate = () => {};

describe("NavBar", () => {
  it("displays the Acebook logo", () => {
    cy.mount(<NavBar/>);
    cy.get('[data-cy="logo-container"]')
    .find("img").should('be.visible');
  });

  it("displays link to log out", () => {
    cy.mount(<NavBar />);
    cy.get('[data-cy="menu-container"]')
    .should('contains', "Log out");
  });

  xit("displays link to feed", () => {
    cy.mount(<NavBar navigate={navigate()}/>);
    cy.get('[data-cy="menu-container"]')
    .should('contain.text', "Feed");
  });

  xit("displays link to create a post", () => {
    cy.mount(<NavBar navigate={navigate()}/>);
    cy.get('[data-cy="menu-container"]')
    .should('contain.text', "Create a post");
  });
});
