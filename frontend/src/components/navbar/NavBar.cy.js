import Navbar from "./NavBar"

describe('Navbar', () => {
  it('NavBar should displays 2 links with nav-item class', () => {
    cy.mount(<Navbar />)

    cy.contains('Farcebook') // checks if the navbar has the correct title

    cy.get('.nav-item') // selects all elements with the 'nav-item' class
      .should('have.length', 2) // checks if there are 2 nav items
    
  })

  it('checks if signup has a link href to /signup', () => {
    cy.mount(<Navbar />)

    cy.get('.nav-item') // selects all elements with the 'nav-item' class
      .eq(1) // selects the second nav item
      .contains('Sign up') // checks if it has a link to the sign up page
      .should('have.attr', 'href', '/signup') // checks if the link's href attribute is '/signup'
  })

  it('checks if signup has a link href to /login', () => {
    cy.mount(<Navbar />)

    cy.get('.nav-item') // selects all elements with the 'nav-item' class
      .eq(0) // selects the first nav item
      .contains('Login') // checks if it has a link to the login page
      .should('have.attr', 'href', '/login') // checks if the link's href attribute is '/login'

  })
})
