import Post from "./Post";

describe("Post", () => {
  it("renders a post with a message", () => {
    cy.mount(<Post post={{ _id: 1, message: "Hello, world" }} />);
    cy.get('[data-cy="post"]').should("contain.text", "Hello, world");
  });

  it("displays the author's name in the comments section", () => {
    cy.mount(<Post post={{ _id: 1, message: "Hello, world", comments: [{ userName: "Alice", message: "Nice post", timeStamp: Date.now() }] }} />);
    cy.get("#showComments").click();
    cy.get('[data-cy="comment"]').should("contain.text", "Alice");
    cy.get("#showComments").click();
  });

  it("allows the user to like a post", () => {
    cy.mount(<Post post={{ _id: 1, message: "Hello, world" }} />);
    cy.get("#like").click();
    cy.get(".likesText").should("contain.text", "Likes: 1");
  });

  it("displays the comment field only after the user clicks the comment button", () => {
    cy.mount(<Post post={{ _id: 1, message: "Hello, world", comments: [{ userName: "Alice", message: "Nice post", timeStamp: Date.now() }] }} />);
    cy.get('[data-cy="comment"]').should("not.exist");
    cy.get("#showComments").click();
    cy.get('[data-cy="comment"]').should("exist");
  });
});


