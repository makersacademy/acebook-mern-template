import Feed from "./Feed";
const navigate = () => {};

describe("Feed", () => {
  it("Calls the /posts endpoint and lists all the posts", () => {
    window.localStorage.setItem("token", "fakeToken");

    cy.intercept("GET", "/posts", (req) => {
      req.reply({
        statusCode: 200,
        body: {
          posts: [
            { _id: 1, message: "Earliest post", author: { usersName: "Kyle" } },
            {
              _id: 2,
              message: "Most recent post",
              author: { usersName: "Kyle" },
            },
          ],
        },
      });
    }).as("getPosts");

    cy.mount(<Feed navigate={navigate} />);

    cy.wait("@getPosts").then(() => {
      cy.get('[data-cy="post"]')
        .first()
        .should("contain.text", "Most recent post");
    });
  });
});
