import CreatePost from './CreatePost'
const navigate = () => {}

describe("Logging in", () => {
  it("calls the /posts endpoint", () => {
    cy.mount(<CreatePost navigate={navigate}/>)
    cy.intercept('POST', '/posts/', { token: "fakeToken", author: "fake user id", message: "hello"}).as("createPostRequest")
    cy.get("textarea").type("hello");
    cy.get('#like-button').click();
    cy.wait('@createPostRequest').then( interception => {
      expect(interception.response.body.message).to.eq("hello")
    })
  })
})