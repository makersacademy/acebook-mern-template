describe("making a post", () => {
  before(() => {
    cy.signup("user@email.com", "12345678");
  });

  it("can log in and create a post", () => {
    cy.visit("/login");
    cy.get("#email").type("user@email.com");
    cy.get("#password").type("12345678");
    cy.get("#submit").click();
  });
});
