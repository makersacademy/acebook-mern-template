describe("making a post", () => {

  before(() => {
    cy.signup("user2@email.com", "123456789");
    cy.visit("/login");
    cy.get("#email").type("user2@email.com");
    cy.get("#password").type("123456789");
    cy.get("#submit").click();
  })

  it("after JWT timeout, redirects to '/login'", () => {
    const now = new Date(Date.UTC(2022, 10, 14)).getTime()
    cy.clock(now);
    cy.url().should("include", "/posts");
    cy.tick(660000);

    cy.get("#post").type("this is a test post");
    cy.get("#submit").click();
    cy.url().should("include", "/signin");
  });

  it("with valid credentials, pushes whatever you type into the box to the list of posts'", () => {
    cy.url().should("include", "/posts");
    cy.get("#post").type("this is a test post");
    cy.get("#submit").click();

    cy.get('.feed').contains("this is a test post").should('have.class', 'first');
  });
});