describe ("Making a post", () => {
  it ("shows posts", () => {
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
//view the post after
  cy.get(".posts").should("contain", "Hello, ")
});
});
 