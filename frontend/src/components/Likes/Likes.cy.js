import Likes from "./Likes";

describe("Likes", () => {
  it("displays the number of likes", () => {
    window.localStorage.setItem("username", "user3")

    cy.intercept('PATCH', '/posts/likes', (req) => {
      req.reply({
        statusCode: 201,
        body: { post:{
            _id: 1, 
            likes: ["user1", "user2", "user3"]
          }
        },
        token: "fakeToken"
      })
    }
  ).as("getLikes")

  const postPropsForLike = { _id: 1, type: "post"}

  cy.mount(<Likes likes={["user1", "user2"]} parent={postPropsForLike} />)

  cy.get('[data-cy="like-button"]').click();
    
  cy.wait("@getLikes").then(() =>{
    cy.get('[data-cy="like-count"]')
    .should('contain.text', "3 likes")
  })
  })
})
