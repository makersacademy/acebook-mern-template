import Post from "./Post";

describe("Post", () => {
  it.skip("renders a post with a message", () => {
    cy.mount(<Post post={{ _id: 1, message: "Hello, world" }} />);
    cy.get('[data-cy="post"]').should("contain.text", "Hello, world");
  });
});


