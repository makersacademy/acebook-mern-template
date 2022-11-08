import Feed from './Feed'
const navigate = () => { }

describe("Feed", () => {
  it("Calls the /posts endpoint and lists all the posts", () => {
    
    window.localStorage.setItem("token", "fakeToken")
    
    cy.intercept('GET', '/posts', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          posts: [
            { _id: 1, message: "Hello, world", author: {usersName: "Kyle"} },
            { _id: 2, message: "Hello again, world", author: {usersName: "Kyle"} }
          ]
        }
      , times: 1}) 
        }).as("getPosts") 


    cy.mount(<Feed navigate={navigate} />)
    
    cy.wait("@getPosts").then(() => {
      cy.get('[data-cy="post"]')
        .should('contain.text', "Hello, world")
        .and('contain.text', "Hello again, world")
    })
  })

  it("calls the /posts endpoint to create a new post", () => {
    window.localStorage.setItem("token", "fakeToken")
    
    cy.mount(<Feed navigate={navigate}/>)
    cy.intercept('POST', '/posts', { message: "OK" , times: 1}).as("postRequest")
    cy.get("#message").type("I wonder what an owlPaca eats...");
    cy.get("#submit").click()
    cy.wait('@postRequest').then( interception => {
      expect(interception.response.body.message).to.eq("OK")
    })
  }) 

})