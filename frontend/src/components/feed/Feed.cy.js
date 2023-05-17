import Feed from './Feed'
const navigate = () => {}

describe("Feed", () => {
  it("Calls the /posts endpoint and lists all the posts", () => {
    window.localStorage.setItem("token", "fakeToken")
    
    cy.intercept('GET', '/posts', (req) => {
        req.reply({
          statusCode: 200,
          body: { posts: [{
              _id: 1, 
              message: "Hello, world",
              authorUserID: {
                              username: "Cypress",
                              _id: "mockHexUserObjectID",
                              email: "cypress@hill.com",
                            },
              createdAt: "2023-05-11T14:09:31.064+00:00",
              comments: [{comment: "fee", author: "fi"}, {comment: "fo", author: "fum"} ]
            }, {
              _id: 2,
              message: "Hello again, world",
              authorUserID: {
                username: "Cypress",
                _id: "mockHexUserObjectID",
                email: "cypress@hill.com",
              },
              createdAt: "2023-05-12T14:09:31.064+00:00",
              comments: [{comment: "fee", author: "fi"}, {comment: "fo", author: "fum"} ]
            }]
          }
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
        body: { posts: [{
            _id: 1, 
            message: "Post 1",
            authorUserID: {
                            username: "Cypress",
                            _id: "mockHexUserObjectID",
                            email: "cypress@hill.com",
                          },
            createdAt: "2023-05-12T14:09:31.064+00:00",
            comments: [{comment: "fee", author: "fi"}, {comment: "fo", author: "fum"} ]
          }, {
            _id: 2,
            message: "Post 2",
            authorUserID: {
              username: "Cypress",
              _id: "mockHexUserObjectID",
              email: "cypress@hill.com",
            },
            createdAt: "2023-05-13T14:09:31.064+00:00",
            comments: [{comment: "fee", author: "fi"}, {comment: "fo", author: "fum"} ]
          }]
        }
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
