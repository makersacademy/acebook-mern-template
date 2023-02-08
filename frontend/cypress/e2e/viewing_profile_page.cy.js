describe("Visiting account page", () => {
  before(() => {
    cy.signup("user@email.com", "12345678");
    cy.login(("user@email.com", "12345678"));
  });

  test("Can visit account page", () => {
    cy.visit("/profile");
  });
});
