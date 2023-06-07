import SignUpForm from './SignUpForm'
const navigate = () => {}

describe("Signing up", () => {
  it("calls the /users endpoint", () => {
    cy.mount(<SignUpForm navigate={navigate}/>)

    cy.intercept('POST', '/users', { message: "OK" }).as("signUpRequest")

    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#firstName").type("test");
    cy.get("#lastName").type("testson");
    cy.get("#userName").type("testy");
    cy.get("#submit").click();
    cy.wait('@signUpRequest').then( interception => {
      expect(interception.response.body.message).to.eq("OK")
    })
  })
  it("does not call the /users endpoint if a field is empty", () => {
    cy.mount(<SignUpForm navigate={navigate}/>)

    cy.intercept('POST', '/users', { message: "TEST" }).as("signUpRequest")

    cy.get("#email").type("someone@example.com");
    cy.get("#firstName").type("test");
    cy.get("#lastName").type("testson");
    cy.get("#userName").type("testy");
    cy.get("#submit").click();
    cy.wait('@signUpRequest').then( interception => {
      expect(interception.response.body.message).to.eq("TEST")
    })
  })
})
