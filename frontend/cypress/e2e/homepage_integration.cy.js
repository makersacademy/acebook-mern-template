describe("Visiting homepage", () => {
  it("takes user to login when button clicked", () => {
    cy.visit("/");
    cy.get("#login-btn").click();
    cy.url().should("include", "/login");
  })

  it("takes user to signup when button clicked", () => {
    cy.visit("/");
    cy.get("#signup-btn").click();
    cy.url().should("include", "/signup");
  })
})
