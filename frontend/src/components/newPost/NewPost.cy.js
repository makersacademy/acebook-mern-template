import NewPost from "./NewPost";
const navigate = () => {};

describe("Feed", () => {
  beforeEach(() => {
    window.localStorage.setItem("token", "fakeToken");
  });

  it("should have a clickable 'add to feed' button", () => {
    cy.mount(<NewPost navigate={navigate} />);
    cy.get(".submit-button")
      .should("be.visible")
      .should("be.enabled")
      .should("contain.text", "Add to Feed");
  });

  it("should have a form for submitting written text", () => {
    cy.mount(<NewPost navigate={navigate} />);
    cy.get(".new-post-form").should("be.visible");
    cy.get('input[placeholder*="Tell people how you\'re feeling..."]');
  });
});
