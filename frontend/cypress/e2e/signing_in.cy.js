describe("Signing in", () => {

  before(() => {
    cy.signup("someone@example.com", "password")
  })

  it("with valid credentials, redirects to '/posts'", () => {
    cy.visit("/login").debug();
    cy.wait(2000)
    cy.get("#email").type("someone@example.com").debug();
    cy.get("#password").type("password").debug();
    cy.get("#submit").click().debug();
    cy.wait(7000).debug(); // wait for 5 seconds
    cy.url().should("include", "/posts").debug();
  });

  it("with missing password, redirects to '/login'", () => {
    cy.visit("/login");
    cy.get("#email").type("someone@example.com");
    cy.get("#submit").click();
    cy.wait(7000); // wait for 5 seconds
    cy.url().should("include", "/login");
  });

  it("with missing email, redirects to '/login'", () => {
    cy.visit("/login");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    cy.wait(7000); // wait for 5 seconds
    cy.url().should("include", "/login");
  });
});