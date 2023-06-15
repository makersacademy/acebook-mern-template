describe("liking a post", () => {
  it("increments like by one then returns to 0 after second click", () => {
    cy.visit("/login");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    cy.visit("/posts")
    cy.get("#submit-like").click();
    cy.contains("Likes: 1");

    cy.get("#submit-like").click();
    cy.contains("some message - Likes: 0");
  })
})