import SignUpForm from './SignUpForm'
const navigate = () => {}

describe("Signing up", () => {
 

  it("calls the /users endpoint", () => {
    cy.mount(<SignUpForm navigate={navigate}/>)

    cy.intercept('POST', '/users', { message: "OK" }).as("signUpRequest")

    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#username").type("usernamename")
    cy.get("#submit").click();
    cy.wait('@signUpRequest').then( interception => {
      expect(interception.response.body.message).to.eq("OK")
    })
  })
  it("navigate to log in page when log in button is clicked", () => {
    cy.mount(<SignUpForm navigate={navigate}/>);
    cy.contains('Log in').click();
    cy.url().should('include', '/login');
    cy.get('h2').should('contain.text', 'Login Page');
  })


})
