import Home from './Home'
const navigate = () => {}

describe("Home page", () => {
  it("allows the user to navigate to the login page or the sign up page", () => {
    cy.mount(<Home navigate={navigate}/>)

    cy.intercept('http://localhost:3000/').as("login")

    cy.get('[href="/login"] > button').click();

    cy.wait('@login').its('request.url').should('include', 'login')
    
  
  })
})