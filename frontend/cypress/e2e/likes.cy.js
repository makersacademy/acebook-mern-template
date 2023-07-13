describe("Liking and Unliking Posts and Comments", () => {
  it("likes a post", () => {
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
    cy.get("#post-likes").click();
    cy.get("#post-like-counter").should("contain", "1 likes");
  });

  it("unlikes a post", () => {
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
    cy.get("#post-likes").click();
    cy.get("#post-likes").click();
    cy.get("#post-like-counter").should("contain", "0 likes");
  });

  it("likes a comment", () => {
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

    cy.get("#comment").type("This is a comment");
    cy.get("#comment-post-button").click();
    
    cy.get("#comment-like").click();
    cy.get("#comment-like-counter").should('contain', "1 likes");

  });

  it("unlikes a comment", () => {
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

    cy.get("#comment").type("This is a comment");
    cy.get("#comment-post-button").click();
    
    cy.get("#comment-like").click();
    cy.get("#comment-like").click();
    cy.get("#comment-like-counter").should('contain', "0 likes");
  });
});