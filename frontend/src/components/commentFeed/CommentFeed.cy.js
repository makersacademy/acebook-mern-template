import CommentFeed from "./CommentFeed";
const navigate = () => {};

describe("CommentFeed", () => {
  it("Calls the /comments endpoint and lists all the posts", () => {
    window.localStorage.setItem("token", "fakeToken");

    cy.intercept("GET", "/comments/655b65ab227b3e82695769de", (req) => {
      req.reply({
        statusCode: 200,
        body: {
          comments: [
            {
              _id: 1,
              message: "first comment",
              post_id: "655b65ab227b3e82695769de",
            },
            {
              _id: 2,
              message: "second comment",
              post_id: "655b65ab227b3e82695769de",
            },
          ],
        },
      });
    }).as("getComments");

    cy.mount(
      <CommentFeed navigate={navigate} post_id="655b65ab227b3e82695769de" />,
    );

    cy.wait("@getComments").then(() => {
      cy.get('[data-cy="comment"]')
        .should("contain.text", "first comment")
        .and("contain.text", "second comment");
    });
  });
});

describe("CommentFeed", () => {
  beforeEach(() => {
    cy.intercept("GET", "/comments/655b65ab227b3e82695769de", {
      statusCode: 200,
      body: { comments: [] },
    }).as("getEmptyComments");
  });

  it("Displays a message for no posts", () => {
    window.localStorage.setItem("token", "fakeToken");

    cy.mount(
      <CommentFeed navigate={navigate} post_id="655b65ab227b3e82695769de" />,
    );

    cy.wait("@getEmptyComments").then(() => {
      cy.get('[data-cy="no-comments-message"]').should(
        "contain.text",
        "No one has commented yet - be the first!",
      );
      cy.get('[data-cy="comment"]').should("not.exist"); // Ensure no comments are rendered
    });
  });
});
