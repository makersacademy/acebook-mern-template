import Feed from './Feed'
const navigate = () => {}

describe("Feed", () => {
  xit("Calls the /posts endpoint and lists all the posts", () => {
    window.localStorage.setItem("token", "fakeToken")
    cy.mount(<Feed navigate={navigate}/>)
    
    cy.intercept('GET', '/posts', (req) => {
        req.reply({
          statusCode: 200,
          body: { posts: [
            {_id: 1, message: "Earliest post"},
            {_id: 2, message: "Most recent post"}
          ] }
        })
      }
    ).as("getPosts")
    
    cy.wait("@getPosts").then(() =>{
      cy.get('article').first()
      .should('contain.text', "Most recent post")
    })
  })
})