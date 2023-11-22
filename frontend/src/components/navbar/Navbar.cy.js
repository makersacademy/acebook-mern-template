import NotAuthNavbar from "./NotAuthNavbar";


// Cypress.on('uncaught:exception', (err, runnable) => {
//   // returning false here prevents Cypress from
//   // failing the test
//   return false
// })

describe("NotAuthNavbar", () => {
  it('renders navbar with the logo', () => {
    cy.mount(<NotAuthNavbar/>)
    cy.get("span").should('contain.text', "Acebook")
  });
})
