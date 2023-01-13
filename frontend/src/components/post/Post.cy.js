import Post from "./Post";

describe("Post", () => {
  it("renders a post with a message", () => {
    const post = { _id: 1, message: "Hello, world", createdAt: Date.now() };
    cy.mount(<Post post={post} />);
    cy.get("[data-cy='post']")
      .should("contain", "Hello, world")
      .and("contain", "Username Here");
  });
});
