import Feed from './Feed'
const navigate = () => {}

describe("Feed", () => {
  it("Calls the /posts endpoint and lists all the posts", () => {
    window.localStorage.setItem("token", "fakeToken")
    
    cy.intercept('GET', '/posts', (req) => {
        req.reply({
          statusCode: 200,
          body: { posts: [
            {_id: 1, message: "Hello, world"},
            {_id: 2, message: "Hello again, world"}
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

  it("submit a post using the form and display it", () => {
    window.localStorage.setItem("token", "fakeToken")
    cy.mount(<Feed navigate={navigate}/>)
    cy.intercept('POST', '/posts', { message: "OK", token: "blah" }).as("newPost")
    cy.get("#postText").type("Hello, world")
    cy.get("#post").click()
    cy.wait("@newPost").then( interception => {
      expect(interception.response.body.message).to.eq("OK")
    })
    
    cy.intercept('GET', '/posts', (req) => {
        req.reply({
          statusCode: 200,
          body: { posts: [
            {_id: 1, message: "Hello, world"}
          ] }
        })
      }
    ).as("getPosts")

    cy.mount(<Feed navigate={navigate}/>)
  })
})
