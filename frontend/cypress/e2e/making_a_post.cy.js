describe("making a post", () => {

  before(() => {
    cy.signup("user@email.com", "12345678");
    cy.visit("/login");
    cy.get("#email").type("user@email.com");
    cy.get("#password").type("12345678");
    cy.get("#submit").click();
  })

  it("after JWT timeout, redirects to '/login'", () => {
    cy.clock();
    cy.url().should("include", "/posts");
    cy.tick(660000);

    cy.get("#submit").click();
    cy.url().should("include", "/login");
  });

  it("with valid credentials, pushes whatever you type into the box to the list of posts'", () => {
    cy.url().should("include", "/posts");
    cy.get("#post").type("this is a test post");
    cy.get("#submit").click();

    cy.get('.feed').contains("this is a test post").should('have.class', 'first');
  });
});