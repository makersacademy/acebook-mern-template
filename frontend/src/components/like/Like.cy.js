import Like from "./Like";

// Perhaps a test for the post component FOR THE POST COMPONENT
//      needs a numberOfLikes object attribute(?)
//          to store list of user ids who have liked it
//          initially the numberOfLikes will be an empty list/object




// Test that the Like component has a number 
//  diplayed next to the thumb icon on the right
//      indicating the number of likes


// Liking
// If the Like is pressed by a user 
//      the user's id is added to a 'listOfLikes' object in the post
//          which is related to that particular post


// Unliking
// If the Like is pressed and
//  the user's id is already in the 'listOfLikes' object
    // the user's id is removed from the 'listOfLikes' object



describe("Like", () => {
    it('renders 3 likes when there are 3 items in the likes array', () => {
        cy.mount(<Like post={{_id: 1, content: "This is my first post", likes: [1, 2, 3]}} />);
        cy.get('[data-cy="post-likes"]').should('contain.text', 3)
    })
})


describe("Like", () => {
    it('renders 0 likes when the post has 0 items in the likes array', () => {
        cy.mount(<Like post={{_id: 1, content: "This is my first post", likes: []}} />);
        cy.get('[data-cy="post-likes"]').should('contain.text', 0)
    })
})


describe("Like", () => {
    it('increases the number of likes by 1 when Like button is clicked', () => {
        cy.mount(<Like post={{_id: 1, content: "This is my first post", likes: []}} />);
        cy.get('[data-cy="post-button"]').click()
        cy.get('[data-cy="post-likes"]').should('contain.text', 1)
    })
})


// Test the colour of an 'unliked' Like
// If the Like has not been pressed yet
//  it is light shade of blue



// Test the colour of a 'liked' Like
// If the Like is pressed
//  the button changes colour to a darker shade of blue
//  to indicate to the user that their like has been registered


// Test that the colour of the Like reverts back once 'unliked' 
// If the Like is dark blue and is pressed again
//  it reverts back to a light shade of blue