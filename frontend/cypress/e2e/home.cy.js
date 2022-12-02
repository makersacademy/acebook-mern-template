describe("Homepage", () => {
  it("redirects to '/login' when login button is pressed", () => {
    cy.visit('/');
    cy.get('[href="/login"] > button').click();

    cy.url().should("include", "/login");
  })
  it("redirects to '/signup' when sign up button is pressed", () => {
    cy.visit('/');
    cy.get('[href="/signup"] > button').click();

    cy.url().should("include", "/signup");
  })
})