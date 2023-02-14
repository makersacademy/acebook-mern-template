import CreatePost from './CreatePost'
const token = "12345"

describe("create new post", () => {
  it("calls the /newPost endpoint", () => {
    cy.mount(<CreatePost token={token}/>)

    cy.intercept('POST', '/newPost', { token: "fakeToken" }).as("postRequest")

    cy.get("#newPost").type("I'm making pancakes!");
    cy.get("#submit").click();
    cy.wait('@postRequest').then( interception => {
      expect(interception.response.body.token).to.eq("fakeToken")
    })
  })
})