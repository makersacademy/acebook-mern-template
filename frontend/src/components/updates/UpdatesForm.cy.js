import UpdatesForm from './UpdatesForm'
const navigate = () => {}

describe("User Update Details", () => {
  it("calls the /usersUpdate", () => {
    cy.mount(<UpdatesForm navigate={navigate}/>)

    cy.intercept('PUT', '/usersUpdate', { message: "OK"}).as("UpdateRequest")

    cy.get("#email").type("someoneNEW@example.com");
   // cy.get("#password").type("NEWpassword");
   // cy.get("#firstName").type("NEWfirstName");
   // cy.get("#lastName").type("NEWlastName");
      cy.get("#submit").click();
      cy.wait('@UpdateRequest').then( interception => {
      expect(interception.response.body.message).to.eq("OK")
    })
  })
})