import NewPostForm from "./NewPostForm";

describe("Post", () => {
  it("can make new post", () => {
    cy.mount(<NewPostForm />);
  });
});
