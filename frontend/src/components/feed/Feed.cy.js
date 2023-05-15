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
})

describe('Feed component', () => {
  it('displays posts in descending order based on creation date', () => {

    window.localStorage.setItem("token", "fakeToken")

    cy.intercept('GET', '/posts', (req) => {
   
      req.reply({
        statusCode: 200,
        body: { posts: [
          {"_id": 1, "message": "Post 1", "createdAt": "2023-05-12"},
          {"_id": 2, "message": "Post 2", "createdAt": "2023-05-13"}
        ] }
      })
    }).as('getPosts')

    cy.mount(<Feed navigate={navigate}/>)
   
    cy.wait("@getPosts")
    cy.get('#feed [data-cy=post]').first()
    .should('contain', 'Post 2')
    cy.get('#feed [data-cy=post]').last()
    .should('contain', 'Post 1')
  })
})
