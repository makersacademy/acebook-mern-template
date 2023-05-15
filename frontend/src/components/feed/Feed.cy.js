import Feed from './Feed'
import { AuthenticationContext } from '../authenticationProvider/AuthenticationProvider'
const navigate = () => {}

describe("Feed", () => {
  it("Calls the /posts endpoint and lists all the posts", () => {
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
    
    const token = "token"
    const setToken = () => {}
    cy.mount(
      <AuthenticationContext.Provider value={{token, setToken}}>
        <Feed navigate={navigate}/>
      </AuthenticationContext.Provider>
    )
    
    cy.wait("@getPosts").then(() =>{
      cy.get('[data-cy="post"]')
      .should('contain.text', "Hello, world")
      .and('contain.text', "Hello again, world")
    })
  })
})
