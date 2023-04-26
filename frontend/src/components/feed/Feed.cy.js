import Feed from "./Feed";
const navigate = () => {};

describe("Feed", () => {
  beforeEach(() => {
    window.localStorage.setItem("token", "fakeToken");
  });

  it("Calls the /posts endpoint and lists all the posts", () => {
    cy.intercept("GET", "/api/posts", (req) => {
      req.reply({
        statusCode: 200,
        body: {
          posts: [
            { _id: 1, message: "Hello, world" },
            { _id: 2, message: "Hello again, world" },
          ],
        },
      });
    }).as("getPosts");

    cy.mount(<Feed navigate={navigate} />);

    cy.wait("@getPosts").then(() => {
      cy.get('[data-cy="post"]')
        .should("contain.text", "Hello, world")
        .and("contain.text", "Hello again, world");
    });
  });
  it("should have a clickable 'create post' button", () => {
    cy.mount(<Feed navigate={navigate} />);
    cy.get(".route-button")
      .should("contain.text", "Post Something")
      .should("be.visible")
      .should("be.enabled");
  });
});
