import LoginForm from './LoginForm'
const navigate = () => {}

describe("Logging in", () => {
  it("calls the /users/login endpoint", () => {
    cy.mount(<LoginForm navigate={navigate}/>)

    cy.intercept('POST', '/users/login', { token: "fakeToken", user: { _id: "123" } }).as("loginRequest")

    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("Password123!");
    cy.get("#submit").click();
    cy.wait('@loginRequest').then( interception => {
      expect(interception.response.body.token).to.eq("fakeToken")
    })
  })
})
