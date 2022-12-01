import Post from "./Post";

describe("Post", () => {
  it("renders a post with a message", () => {
    cy.mount(<Post post={{ _id: 1, message: "Hello, world" }} />);
    cy.get('[data-cy="post"]').should("contain.text", "Hello, world");
  });

  it("renders a post with a message and a timestamp number", () => {
    cy.mount(
      <Post post={{ _id: 1, message: "Hello, world", time: 1669898677163 }} />
    );
    cy.get('[data-cy="post"]')
      .should("contain", "Hello, world")
      .and("contain", "Thu Dec 01 2022");
  });
});
