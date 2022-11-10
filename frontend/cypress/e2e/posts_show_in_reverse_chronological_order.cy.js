describe ("Timeline", () => {
  it ("shows posts in reverse chronological order", () => {
//sign up
    cy.visit("/signup");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

//sign in
  cy.visit("/login");
  cy.get("#email").type("someone@example.com");
  cy.get("#password").type("password");
  cy.get("#submit").click();

  //submit a post
  cy.visit("/posts");
  cy.contains("New post").click();
  cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
  cy.get("#new-post-form").submit();
  cy.contains("New post").click();
  cy.get("#new-post-form").find('[type="text"]').type("Second post, should appear first");
  cy.get("#new-post-form").submit();
  cy.get("li").first().should("have.text", "Second post, should appear first")
});
});
 