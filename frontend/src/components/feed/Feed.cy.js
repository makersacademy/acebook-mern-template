import Feed from './Feed'
const navigate = () => {}

describe("Feed", () => {
  it("Calls the /posts endpoint and lists all the posts", () => {
    window.localStorage.setItem("token", "fakeToken")
    
    cy.intercept('GET', '/api/posts', (req) => {
        req.reply({
          statusCode: 200,
          body: { posts: [
            {id: 1, content: "This is my first post"},
            {id: 2, content: "This is my second post"}
          ] }
        })
      }
    ).as("getPosts")

    cy.mount(<Feed navigate={navigate}/>)
    
    cy.wait("@getPosts").then(() =>{
      cy.get('[data-cy="post-content"]')
      .should('contain.text', "This is my first post")
      .and('contain.text', "This is my second post")
    })
  })
})
