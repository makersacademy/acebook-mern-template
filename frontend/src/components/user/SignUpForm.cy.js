import SignUpForm from './SignUpForm'
const navigate = () => {}

describe("Signing up", () => {
  it("calls the /users/signup endpoint", () => {
    cy.mount(<SignUpForm navigate={navigate}/>)

    cy.intercept('POST', '/users/signup', { message: "OK" }).as("signUpRequest")
    cy.get("#name").type("someone");
    cy.get("#aboutMe").type("from somewhere");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("Password123!");
    cy.get("#submit").click();
    cy.wait('@signUpRequest').then( interception => {
      expect(interception.response.body.message).to.eq("OK")
    })
  })
})
