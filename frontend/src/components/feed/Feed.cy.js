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
          ]}
        })
      }).as("getPosts")
    cy.mount(<Feed navigate={navigate}/>)
    cy.wait("@getPosts").then(() =>{
      cy.get('[data-cy="post"]')
      .should('contain.text', "Hello, world")
      .and('contain.text', "Hello again, world")
    })
  });

  it("it displays a list of all the post links", () => {
    window.localStorage.setItem("token", "fakeToken")
    cy.intercept('GET', '/posts', (req) => {
      req.reply({
        statusCode: 200,
        body: { posts: [
          {_id: 1, message: "Hello, world"},
          {_id: 2, message: "Hello again, world"}
        ]}
      })
    }).as("getPosts")
    cy.mount(<Feed navigate={navigate}/>)
    cy.wait("@getPosts").then(() =>{
      cy.get('[data-cy="post"]')
      cy.contains('Hello, world').click()
      cy.url().should('include', '#1')
      cy.go('back')
      cy.contains('Hello again, world').click()
      cy.url().should('include', '#2')
    })
  });

  it("it sorts the posts by last one added first", () => {
    window.localStorage.setItem("token", "fakeToken")
    cy.intercept('GET', '/posts', (req) => {
      req.reply({
        statusCode: 200,
        body: { posts: [
          {_id: 1, message: "Hello, world"},
          {_id: 2, message: "Hello again, world"}
        ]}
      })
    }).as("getPosts")
    cy.mount(<Feed navigate={navigate}/>)
    cy.wait("@getPosts").then(() =>{
      cy.get('[data-cy="post"]')
        .eq(0)
        .should('contain.text', 'Hello again, world')
      cy.get('[data-cy="post"]')
        .eq(1)
        .should('contain.text', 'Hello, world')
    })
  });

})


