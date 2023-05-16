import UserForm from './UserForm'
const navigate = () => {}

describe("update user details", () => {
  it("calls the /userUpdatesRoute endpoint", () => {
    cy.mount(<UserForm navigate={navigate}/>)

    cy.intercept('PUT', '/userUpdatesRoute', { message: "OK" }).as("userUpdate")

    cy.get("#email").type("someone@example.com");
    // cy.get("#password").type("password");
    // cy.get("#firstName").type("firstName");
    // cy.get("#lastName").type("lastName");
    cy.get("#submit").click();
    cy.wait('@userUpdate').then( interception => {
      expect(interception.response.body.message).to.eq("OK")
    })
  })
})
