import Post from "./Post";

describe("Post", () => {
  it("renders a post with a message", () => {
    cy.mount(
      <Post
        post={{ _id: 1, user: { name: "someone" }, message: "Hello, world" }}
      />
    );
    cy.get('[data-cy="post"]').should(
      "contain.text",
      "Post from someone:Hello, world"
    );
  });
});
