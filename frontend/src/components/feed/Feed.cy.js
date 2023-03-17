import Feed from "./Feed";
const navigate = () => {};

describe("Feed", () => {
  it("Calls the /posts endpoint and lists all the posts in reverse chronological order", () => {
    window.localStorage.setItem("token", "fakeToken");

    cy.intercept("GET", "/posts", (req) => {
      req.reply({
        statusCode: 200,
        body: {
          posts: [
            { _id: 1, user: { name: "someone" }, message: "Hello, world" },
            {
              _id: 2,
              user: { name: "someone else" },
              message: "Hello again, world",
            },
          ],
        },
      });
    }).as("getPosts");

    cy.mount(<Feed navigate={navigate} />);

    cy.wait("@getPosts").then(() => {
      cy.get('[data-cy="post"]')
        .should("have.length", 2)
        .first()
        .should("contain.text", "Post from someone else:Hello again, world")
        .next()
        .should("contain.text", "Post from someone:Hello, world");
    });
  });
});
