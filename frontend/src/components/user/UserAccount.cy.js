// CAN'T EVEN TRY GETTING TEST TO WORK POSSIBLY DUE TO APPARENT ISSUE WITH USER ID IN ROUTE

// import UserAccount from "./UserAccount";

// const navigate = () => {};

// describe("UserProfileFeed", () => {
//   it("Calls the /posts endpoint and lists all the posts by specific user", () => {

//     window.localStorage.setItem("token", "fake token");

//     cy.mount(<UserAccount navigate={navigate} />)

//     cy.intercept("GET", `/users/data/655c8c233f55fc7b1bbf4b2d`, (req) => {
//       req.reply({
//         statusCode: 200,
//         body: {
//           user: [
//             { _id: "655c8c233f55fc7b1bbf4b2d", username: "Test Username", avatar: "0.svg" },
//           ],
//         },
//       });
//     }).as("getUserById");

//     cy.wait("@getUserById").then(() => {
//       cy.get('[data-cy="header"]')
//         .should("contain.text", "Test Username")
//     });
//   });
// });