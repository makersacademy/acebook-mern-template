import CreatePost from './CreatePost'

const token = "12345"

describe("create new post", () => {
  it("calls the /posts endpoint", () => {
    cy.mount(<CreatePost token={token}/>)

    cy.intercept('POST', '/posts', { token: "fakeToken" }).as("postRequest")

    cy.get("#title").type("What I'm cooking..");
    cy.get("#content").type("I'm making pancakes!");
    cy.get("#submit").click();
    cy.wait('@postRequest').then( interception => {
      expect(interception.response.body.token).to.eq("fakeToken")
    })
  })
})

