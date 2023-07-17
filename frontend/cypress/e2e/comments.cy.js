describe("Making a comment", () =>{
  it("logs in, creates a post and creates a comment", () => {
    cy.visit("/")
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
    // cy.contains("This is a test post").should("be.visible");
    console.log(cy.get(".comment-form"))
    cy.get(".comment-form").last().type("This is a test comment");
    cy.get("#comment-post-button").last().click();
    cy.contains("This is a test comment").should("be.visible");
  });
});