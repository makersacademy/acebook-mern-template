describe("post function", () => {
  before(() => {
    cy.signup("someone@example.com", "password", "John", "Smith");
  });

  // this test is not working following the implementation of the like button. Not sure why.
  it("tests to see if a posts can be deleted", () => {
    cy.visit("/login");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    cy.get("#message").type("cypress test 45");
    cy.get("#submit").click();
    cy.get('[data-cy="delete"]').last().click();  
    cy.get('[data-cy="post"]').contains("cypress test 45").should("not.exist");
    // cy.get('.left-aligned').contains("cypress test 45").should("not.exist"); This line doesn't work either.
  });
});
