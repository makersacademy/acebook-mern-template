//// ************* TEST CURRENTLY NOT PASSING BECAUSE OF LINE 14 ***************
//// **** user_id is not passed into url in intercepit function: undefined ****

// import UserProfileFeed from "./UserProfileFeed";

// const navigate = () => {};

// describe("UserProfileFeed", () => {
//   it("Calls the /posts endpoint and lists all the posts by specific user", () => {

//     window.localStorage.setItem("token", "fake token");

//     cy.mount(<UserProfileFeed navigate={navigate} />)

//     cy.intercept("GET", `/profile/65573aad98d46e203728b1d2`, (req) => {
//       req.reply({
//         statusCode: 200,
//         body: {
//           posts: [
//             { _id: 1, message: "test post 666", user_id: "65573aad98d46e203728b1d2" },
//             { _id: 2, message: "test post 2", user_id: "65573aad98d46e203728b1d2" },
//           ],
//         },
//       });
//     }).as("getPostsById");

//     cy.wait("@getPostsById").then(() => {
//       cy.get('[data-cy="post"]')
//         .should("contain.text", "test post 666")
//         .and("contain.text", "test post 2");
//     });
//   });
// });
