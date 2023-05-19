import Navbar from "./NavBar"

describe('Navbar', () => {
  describe('When user is loged in', () => {
    it('Displays only logout link', () => {
      window.localStorage.setItem("token", "fakeToken") // simulate login

      cy.mount(<Navbar />)
  
      cy.contains('Farcebook') // checks if the navbar has the correct title

      cy.get('.nav-item') // selects all elements with the 'nav-item' class
        .should('have.length', 1) // checks if there is 1 nav item
        .contains('Logout') // checks if it has a link to the logout page
      
    })
  })


  it('checks if signup has a link href to /login', () => {
    window.localStorage.setItem("app-route", "signup") // simulate context of signup page

    cy.mount(<Navbar />)

    cy.get('.nav-item') // selects all elements with the 'nav-item' class
    .should('have.length', 1) // checks if there is 1 nav item
    .contains('Login') // checks if it has a link to the sign up page
      .should('have.attr', 'href', '/login') // checks if the link's href attribute is '/signup'
  })

  it('checks if signup has a link href to /login', () => {
    window.localStorage.setItem("app-route", "login") // simulate context of login page

    cy.mount(<Navbar />)

    cy.get('.nav-item') // selects all elements with the 'nav-item' class
      .should('have.length', 1) // checks if there is 1 nav item
      .eq(0) // selects the first nav item
      .contains('Sign up') // checks if it has a link to the login page
      .should('have.attr', 'href', '/signup') // checks if the link's href attribute is '/login'

  })
})
