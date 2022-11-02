describe("making a post", () => {

  before(() => {
    cy.signup("user@email.com", "12345678")
  })

  it("after JWT timeout, redirects to '/login'", () => {
    cy.visit("/login");
    cy.get("#email").type("user@email.com");
    cy.get("#password").type("12345678")
    cy.get("#submit").click();

    cy.url().should("include", "/posts");

    // how do we mock the token timing out

    cy.url().should("include", "/login");
  });

  it("with valid credentials, redirects to '/posts'", () => {
    cy.visit("/login");
    cy.get("#email").type("user@email.com");
    cy.get("#password").type("12345678");
    cy.get("#submit").click();
    cy.url().should("include", "/posts");

    cy.get("#post").type("this is a test post");
    cy.get("#submit").click();

    cy.get('.feed').contains("this is a test post").should('have.class', 'first');
  });
});s