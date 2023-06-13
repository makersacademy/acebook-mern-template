import Post from './Post'

describe("Post", () => {
  it('renders a post with a message', () => {
    cy.mount(<Post post={{_id: 1, message: "Hello, world"}} />);
    cy.get('[data-cy="post"]').should('contain.text', "Hello, world")
  })

  it("Calls the /posts endpoint and lists all the comments for the post", () => {
    window.localStorage.setItem("token", "fakeToken")
    
    let commentData = [ 
      {_id: 1, message: "comment one"}, 
      {_id: 2, message: "comment two"},
    ]

    const post = { _id: 1,
      message: "post one",
      comments: commentData,
    }
    // not sure what is going on here
    cy.intercept('GET', '/posts', (req) => {
        req.reply(
          {
          statusCode: 201,
          body: { posts: [{ _id: 1, comments: commentData }] }
          }
        )
      }
    ).as("getComments")

    cy.mount(<Post post={post}/>)
    
    cy.wait("@getComments").then(() =>{
      cy.get('[data-cy="comment"]')
      .should('contain.text', "comment one")
      .and('contain.text', "comment two")
    })
  })

  it("Calls post /add-comment endpoint when submitting the new comment form", () => {
    window.localStorage.setItem("token", "fakeToken")

    const post = { _id: 1,
      message: "post one",
    }

    cy.mount(<Post post={post}/>)

    cy.intercept('POST', 'posts/add-comment', {message: "OK"}).as("postAddComment")

    cy.get('[data-cy="comment-input-field"]').type("Making a comment");
    cy.get('[data-cy="submit-comment"]').click();
    cy.wait('@postAddComment').then( interception => {
      expect(interception.response.body.message).to.eq("OK")
    })
  })
})
