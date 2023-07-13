describe("Signing Out", () => {
  it("clicking on the log out button takes you to the /", () => {
    cy.visit("/login");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#username_test").type("username_test");
    cy.get("#submit").click();

    cy.contains("Logout").click();
  });
});