describe("Signing Out", () => {
  it("clicking on the log out button takes you to the /", () => {
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
    cy.contains("Logout").click();
    cy.contains("Yes").click();
    cy.get("#login-placeholder").should("be.visible");
  });
});
