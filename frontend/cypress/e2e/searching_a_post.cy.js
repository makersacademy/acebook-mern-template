describe("Searching a post", () => {
  it("with valid credentials, creates two posts and searching a keyword in a post displays one", () => {
    cy.visit("/");
    cy.contains("Sign Up").click();
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#username").type("username");
    cy.get("#submit").click();
    cy.contains("Log In").click();
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    cy.get(".create-post-container").type("This is a test post");
    cy.get("#post-submit").click();
    cy.get(".create-post-container").type("Search Item");
    cy.get("#post-submit").click();
    cy.get(".search-bar").type("Search Item");
    cy.contains("Search Item").should("exist");
  });
});
