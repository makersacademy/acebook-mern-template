
import Comment from "./Comment";

describe("Comment", () => {
  it("renders a comment with a message", () => {
    cy.mount(<Comment comment={{ _id: 1, message: "Test comment" }} />);
    cy.get('[data-cy="comment"]').should("contain.text", "Test comment");
  });
});
