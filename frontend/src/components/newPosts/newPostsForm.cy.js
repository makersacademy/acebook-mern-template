import newPostsForm from './newPostsForm'
const navigate = () => {}

describe("Adding a post", () => {
  it("calls the /tokens endpoint", () => {
    cy.mount(<LoginForm navigate={navigate}/>)

    cy.intercept('POST', '/tokens', { token: "fakeToken" }).as("loginRequest")

    cy.get("#email").type("someone@example.com");
    cy.get("#username").type("exampleusername");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    cy.wait('@loginRequest').then( interception => {
      expect(interception.response.body.token).to.eq("fakeToken")
    })
  })
})
