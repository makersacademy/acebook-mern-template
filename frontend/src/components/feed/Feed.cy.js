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
it("it displays a list of all the post links", () => {
  window.localStorage.setItem("token", "fakeToken")
  cy.intercept('GET', '/posts', (req) => {
    req.reply({
      statusCode: 200,
      body: { posts: [
        {_id: 1, message: "Hello, world"}
        // {_id: 2, message: "Hello again, world"}
      ] }
    })
  }
).as("getPosts")

cy.mount(<Feed navigate={navigate}/>)

cy.wait("@getPosts").then(() =>{
  // get the message
  // click the first message
  // cy.get('[data-testid="assertions-link"]')
  cy.get('[data-cy="post"]')
  cy.screenshot()
  //should have a link contain the id of the message
  .should('contain.text', "Hello, world")
  
      .and('have.attr', 'href')
      .and('include', '/1')
})
})
})


