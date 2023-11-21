describe("Creating a post", () => {
  before(() => {
    // Create a new user through signup
    cy.signup("someuser", "someone@example.com", "password1!");
    // Visit the login page and sign in
    cy.visit('/login');
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password1!");
    cy.get("#submit").click();
    cy.url().should("include", "/posts");
});

  it("should display a new post in the feed below after submitting", () => {
    // visit posts page
    cy.visit("/posts");
  

    //enter a post in the input box
    cy.get('[data-cy="new-post-input"]').type("This is a new post");

    //submit the form
    cy.get('[data-cy="post-form"]').submit();

    //check the post appears in the feed
    cy.contains("This is a new post", { timeout: 10000 }).should("be.visible");
  });
});
