import SignUpForm from './SignUpForm'
const navigate = () => {}

describe("Signing up", () => {
  it("calls the /users endpoint", () => {
    cy.mount(<SignUpForm navigate={navigate}/>)

    cy.intercept('POST', '/api/users', { message: "OK" }).as("signUpRequest")
    cy.get("#name").type("Jay");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get(".submit-button").click();
    cy.wait('@signUpRequest').then( interception => {
      expect(interception.response.body.message).to.eq("OK")
    })
  })
})
