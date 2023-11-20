import LikeButton from "./Like";

// Perhaps a test for the post component
//      needs a numberOfLikes object attribute(?)
//          to store list of user ids who have liked it
//          initially the numberOfLikes will be an empty list/object


// Test that the LikeButton thumb icon exits
// describe("Like", () => {
//     it("renders a button in a thumb icon", () => {
//         cy.mount
//     })
// })



// Test that the LikeButton component has a number 
//  diplayed next to the thumb icon on the right
//      indicating the number of likes


// Liking
// If the LikeButton is pressed by a user 
//      the user's id is added to a 'listOfLikes' object
//          which is related to that particular post


// Unliking
// If the LikeButton is pressed and
//  the user's id is already in the 'listOfLikes' object
    // the user's id is removed from the 'listOfLikes' object


// Test numberOfLikes
// The length of the 'listOfLikes' object
    // is assigned to the number displayed on the right of the thumb icon



// Test the colour of an 'unliked' LikeButton
// If the LikeButton has not been pressed yet
//  it is light shade of blue



// Test the colour of a 'liked' LikeButton
// If the LikeButton is pressed
//  the button changes colour to a darker shade of blue
//  to indicate to the user that their like has been registered


// Test that the colour of the LikeButton reverts back once 'unliked' 
// If the LikeButton is dark blue and is pressed again
//  it reverts back to a light shade of blue