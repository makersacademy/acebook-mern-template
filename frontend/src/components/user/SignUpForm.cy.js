import SignUpForm from './SignUpForm'
const navigate = () => {}

describe("Signing up", () => {
  it("calls the /users endpoint", () => {

    cy.intercept('POST', '/users', { message: "OK" }).as("signUpRequest")

    cy.mount(<SignUpForm navigate={navigate}/>)

    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#usersName").type("Kyle Cook");
    cy.get("#submit").click();
    cy.wait('@signUpRequest').then( interception => {
      expect(interception.response.body.message).to.eq("OK")
    })
  })
})
