describe("post function", () => {
  before(() => {
    cy.signup("someone@example.com", "password", "John", "Smith");
  });

  it("tests to see if a posts can be deleted", () => {
    cy.visit("/login");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    cy.get("#message").type("cypress test 45");
    cy.get("#submit").click();

    cy.get("#delete").last().click();

    cy.get('[data-cy="post"]').contains("cypress test 45").should("not.exist");
  });
});
