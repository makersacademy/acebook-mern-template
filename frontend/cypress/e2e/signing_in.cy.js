describe("Signing in", () => {
  it("with valid credentials, redirects to '/posts'", () => {
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
    cy.get(".create-post-container").should("be.visible");
  });

  it("with missing password, redirects to '/login'", () => {
    cy.visit("/");
    cy.contains("Log In").click();
    cy.get("#email").type("someone@example.com");
    cy.get("#submit").click();
    cy.get("#submit").should("be.visible");
  });

  it("with missing email, redirects to '/login'", () => {
    cy.visit("/");
    cy.contains("Log In").click();
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.get("#submit").should("be.visible");
  });
});
