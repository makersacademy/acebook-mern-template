import UserProfile from './userProfile.js'
const navigate = () => {}

describe("UserProfile", () => {
  it("Calls the /users endpoint and displays the user", { defaultCommandTimeout: 10000 }, () => {
    window.localStorage.setItem("token", "fakeToken")
    
    
    cy.intercept('GET', '/users', (req) => {
        req.reply({
          statusCode: 200,
          body: { user: 
            {_id: 1, username: "username"},
          }
        })
      }
    ).as("getUsers")

    cy.mount(<UserProfile navigate={navigate}/>)
    
    cy.wait("@getUsers").then(() =>{
      cy.get('[data-cy="user"]')
      .should('contain.text', "username")
    })
  })
})

