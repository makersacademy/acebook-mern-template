import Navbar from './Navbar';

describe('Navbar', () => {
  it('displays a nav element with home button', () => {
    cy.mount(<Navbar/>)
    cy.get('nav').should('exist')
    cy.get('[data-cy="homeButton"]').should('exist').and('contain','Home')
  })

  it('displays logout button', () => {
    cy.mount(<Navbar/>)
    cy.get('nav').should('exist')
    cy.get('[data-cy="logoutButton"]').should('exist').and('contain','Log out')
  })
})