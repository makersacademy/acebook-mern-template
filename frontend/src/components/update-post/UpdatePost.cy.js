import UpdatePost from './UpdatePost'
const navigate = () => {}

describe("UpdatePost", () => {
  it("Calls the /posts/:id/update endpoint and updates the correct post", () => {
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
})
