describe("Signing in", () => {
 
  before(() => {
    cy.signup("@email.com", "12345678", "someone", "someone")
  })

  it("with valid credentials, redirects to '/'", () => {
    cy.visit("/login");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    cy.url().should("include", "/");
    cy.get("button:contains(Log Out)").should("be.visible");

  });
  it("with missing password, redirects to '/login'", () => {
    cy.visit("/login");
    cy.get("#email").type("someone@example.com");
    cy.get("#submit").click();

    cy.url().should("include", "/login");
  });

  it("with missing email, redirects to '/login'", () => {
    cy.visit("/login");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    cy.get("div:contains(Invalid Log In Details)").should("be.visible");
    cy.url().should("include", "/login");
  });
});