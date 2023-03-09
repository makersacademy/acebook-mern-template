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

  it("sends a post request to /posts and response a OK message", () => {
    window.localStorage.setItem("token", "fakeToken");

    cy.intercept("POST", "/posts", { message: "OK" }).as("newPostRequest");
    cy.mount(<Feed navigate={navigate} />);

    cy.get('input[data-cy="post-input"]').should("exist");
    cy.get('input[data-cy="post-input"]').type("This is a new post");
    cy.get('button[data-cy="form-submit"]').should("exist");
    cy.get('button[data-cy="form-submit"]').click();
    cy.wait(1000);
    cy.wait("@newPostRequest")
      .its("response.body.message")
      .should("equal", "OK");
  });
});
