describe("Making a post", () => {
  before(() => {
    cy.signup("user@email.com", "12345678");
  });

  it("when signed-in when can make a post", () => {
    cy.visit("/login");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    cy.visit("/new_post");
    cy.get("#content").type("this is a post");
    cy.get("#submit").click();

    cy.url().should("include", "/posts");
  });

  it("redirects to login when not signed-in", () => {
    
    cy.visit("/new_post");
    cy.get("#content").type("this is a post");
    cy.get("#submit").click();

    cy.url().should("include", "/login");
  });
});
