import NewPostForm from "./NewPostForm";

describe("NewPostForm", () => {
  it("Makes a POST request to /posts and lists the new post", () => {
    window.localStorage.setItem("token", "fakeToken")

    cy.mount(<NewPostForm />)

    cy.intercept('POST', '/posts', { message: "OK", token: "fakeToken" }).as("sendPost")
    // renamed sendPost instead of newPost - newPost alias may have been causing tests to fail
    // as too close to NewPostForm?

    cy.get('#new-post-field').should('be.visible').type("Solmaz and Natasha are amazing!")
    cy.get('#new-post-button').should('be.visible').click()

    cy.wait("@sendPost").then((interception) => {
      expect(interception.response.body.message).to.equal("OK");
    })
  })
})

