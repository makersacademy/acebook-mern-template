describe("Signing in", () => {

  before(() => {
    cy.signup("User", "user@email.com", "12345678");
    cy.login("user@email.com", "12345678");
  });

  it("creates a new post", () => {
    cy.get("#newPost").type("Let's chat!");
    cy.get("#submit").click();

    cy.contains('div.message', "Let's chat!").should('be.visible');
  });

  it("throws an error if the user posts nothing", () => {
    cy.get("#submit").click();

    cy.contains('p.validation-error', "Please enter a post").should('be.visible');
  })
  it("displays your like when you like a post", () => {
    cy.get("#newPost").type("Let's chat!");
    cy.get("#submit").click();
    cy.get(".like-button:first").click();

    cy.contains('div.likes', "1").should('be.visible');
  })

  it("returns to login page after clicking logout", () => {
    cy.get(".logout").click();

    cy.url().should("include", "/login")
  })
});