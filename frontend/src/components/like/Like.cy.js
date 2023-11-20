import Like from "./Like";

// Perhaps a test for the post component FOR THE POST COMPONENT
//      needs a numberOfLikes object attribute(?)
//          to store list of user ids who have liked it
//          initially the numberOfLikes will be an empty list/object


// Test that the Like thumb icon exits
// describe("Like", () => {
//     it("renders a button in a thumb icon", () => {
//         cy.mount
//     })
// })



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


// Test numberOfLikes
// The length of the 'listOfLikes' object
    // is assigned to the number displayed on the right of the thumb icon



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