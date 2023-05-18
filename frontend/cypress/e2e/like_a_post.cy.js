describe('Liking a post', () => {

  beforeEach(() => {
    cy.signup("user@email.com", "12345678")
    cy.login("user@email.com", "12345678")
  })

  it("increments the like value of the post by 1 and changes the button to unlike", () => {
    cy.visit("/posts");
    cy.make_a_post("This is post #1")
    
    // check the likes and button symbol of the post we just made
    cy.get('.like-amount').last()
    .should('contain.text', 'Likes: 0')
    cy.get('.like-button').last()
    .should('contain.text', '👍')

    // click that button
    cy.get('.like-button').last().click()

    // check if value incremented by 1 and button symbol flipped
    cy.get('.like-amount').last()
    .should('contain.text', 'Likes: 1')
    cy.get('.like-button').last()
    .should('contain.text', '👎')
  })

  it("decrements the like value of the post by 1 and changes the button to like", () => {
    cy.visit("/posts");

    // click the button to like the last post button
    // as our latest test has left the button in liked stance
    // this should unlike it
    cy.get('.like-button').last().click()

    // check if value decremented by 1 and button symbol flipped
    cy.get('.like-amount').last()
    .should('contain.text', 'Likes: 0')
    cy.get('.like-button').last()
    .should('contain.text', '👍')
  })
})
