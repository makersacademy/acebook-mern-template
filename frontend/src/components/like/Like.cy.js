import Like from './Like'

describe("Like", () => {
  it("sends a like to the particular post selected", () =>{
    window.localStorage.setItem("token", "fakeToken")
    // mock the response that will be received from the server
    // once button is clicked
    cy.intercept('POST', '/posts/like', (req) => {
      req.reply({
        statusCode: 200,
        body: { 
          likes: 5,
          token: "newToken"
        }
      })
    }
  ).as("likePost")
    // define the starting characteristics of the button
    cy.mount(<Like likes={4} post_id={ 1 }/>)
    // press the button
    cy.get('.like-button').should('be.visible').click()


    cy.wait("@likePost").then(() => {
    // check if likes are incremented
      cy.get('.like-amount')
      .should('contain.text', 'Likes: 5')
    // check if the button swapped to unlike button
      cy.get('.like-button')
      .should('contain.text', '👎')
    })
  })

  it("sends an unlike to the particular post selected", () =>{
    window.localStorage.setItem("token", "fakeToken")
    // mock the response that will be receivedgit from the server
    // once button is clicked
    cy.intercept('POST', '/posts/unlike', (req) => {
      req.reply({
        statusCode: 200,
        body: { 
          likes: 3,
          token: "newToken"
        }
      })
    }
  ).as("unlikePost")
    // define the starting characteristics of the button
    // reminder => you cannot see the unlike button unless the
    // user has already liked the post (server will then return
    // didUserLikeThis: true in that case)
    cy.mount(<Like likes={4} post_id={ 1 } didUserLikeThis={true}/>)
    // press the button
    cy.get('.like-button').should('be.visible').click()


    cy.wait("@unlikePost").then(() => {
    // check if likes are incremented
      cy.get('.like-amount')
      .should('contain.text', 'Likes: 3')
    // check if the button swapped to like button
      cy.get('.like-button')
      .should('contain.text', '👍')
    })
  })
})