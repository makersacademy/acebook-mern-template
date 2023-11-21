import ProfileFeed from './ProfileFeed'
const navigate = () => {}

describe("ProfileFeed", () => {
  it("Calls the endpoint for a specific user and lists all their posts with date", () => {
    const userId = 'someUserId'; // Replace with an actual user ID
    window.localStorage.setItem("token", "fakeToken")
    
    cy.intercept('GET', `/posts/user`, (req) => {
        req.reply({
          statusCode: 200,
          body: { posts: [
            {_id: 1, message: "User specific post 1", date: "2023-11-15T16:38:35.366Z" },
            {_id: 2, message: "User specific post 2", date: "2023-10-15T16:38:35.366Z" }
          ] }
        })
      }
    ).as("getUserPosts")

    cy.mount(<ProfileFeed userId={userId} navigate={navigate}/>)

    cy.wait("@getUserPosts").then(() =>{
      cy.get('[data-cy="post"]')
      .should('contain.text', "User specific post 1")
      .should('contain.text', "15/11/2023, 16:38")
      .and('contain.text', "User specific post 2")
      .and('contain.text', "15/10/2023, 17:38")
    })
  })
})
