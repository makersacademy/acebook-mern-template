import Feed from "./UserProfileFeed";
const navigate = () => {};

describe("UserProfileFeed", () => {
  it("Calls the /posts endpoint and lists all the posts by specific user", () => {
    window.localStorage.setItem("token", "fakeToken");

    cy.intercept("GET", `/users/profile/:user_id`, (req) => {
      req.reply({
        statusCode: 200,
        body: {
          posts: [
            { _id: 1, message: "test post 666" },
            { _id: 2, message: "test post 2" },
          ],
        },
      });
    }).as("getPostsById");

    cy.mount(<Feed navigate={navigate} />);

    cy.wait("@getPostsById").then(() => {
      cy.get('[data-cy="post"]')
        .should("contain.text", "test post 666")
        .and("contain.text", "test post 2");
    });
  });
});
