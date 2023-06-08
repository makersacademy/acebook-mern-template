import Feed from './Feed'
const navigate = () => {}

describe("Feed", () => {
  it("Calls the /posts endpoint and lists all the posts", () => {
    window.localStorage.setItem("token", "fakeToken")
    
    cy.intercept('GET', '/posts', (req) => {
        req.reply({
          statusCode: 200,
          body: { posts: [
            {_id: 1, newPost: "Hello, world"},
            {_id: 2, newPost: "Hello again, world"}
          ] }
        })
      }
    ).as("getPosts")

    cy.mount(<Feed navigate={navigate}/>)
    
    cy.wait("@getPosts").then(() =>{
      cy.get('[data-cy="post"]')
      .should('contain.text', "Hello, world")
      .and('contain.text', "Hello again, world")
    })
  })

  it("Should post a new post and display on the page", () => {
    cy.mount(<Feed navigate={navigate}/>)

    cy.intercept('POST', '/posts', { newPost: "my new post", token: "fakeToken" }).as("post")

    cy.get("#post").type("my new post");
    cy.get("#submit").click();
    cy.wait('@post').then( interception => {
      expect(interception.response.body.token).to.eq("fakeToken")
    })
  })
})
