import Post from "./Post";

describe("Post", () => {
  it("renders a post with a message", () => {
    cy.mount(<Post post={{ _id: 1, message: "Hello, world" }} />);
    cy.get('[data-cy="post"]').should("contain.text", "Hello, world");
  });

  it("renders a post with a message and image", () => {
    // Mount the component with the desired props
    cy.mount(
      <Post
        post={{ _id: 1, message: "Hello, world", image_path: "test.png" }}
      />,
    );
    // Check if the message is displayed
    cy.get('[data-cy="post"]').should("contain.text", "Hello, world");
    // Check if the image is displayed with the correct source
    cy.get('[data-cy="post-image"]')
      .should("be.visible")
      .and("have.attr", "src")
      .should("include", "test.png");
  });

  it("renders a post with a message and no image", () => {
    // Mount the component with the desired props (no image_path)
    cy.mount(
      <Post post={{ _id: 1, message: "Hello, world", image_path: null }} />,
    );
    // Check if the message is displayed
    cy.get('[data-cy="post"]').should("contain.text", "Hello, world");
    // Check if there is no image element
    cy.get('[data-cy="post-image"]').should("not.exist");
  });
});
