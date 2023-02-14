describe("post function", () => {
  before(() => {
    cy.signup("someone@example.com", "password", "John", "Smith");
  });

  it("tests to see if the post button and box works properly", () => {
    // need to login in from the login page
    cy.visit('/login');
    cy.get('#email').click();
    cy.get('#email').type('someone@example.com');
    cy.get('#password').click();
    cy.get('#password').type('password');
    cy.get('#submit').click();
    cy.get('#message').click();
    cy.get('#message').type('This is a test post');
    cy.get('#submitPost').click();
    cy.get('form:nth-child(2)').submit();
    cy.url().should('contains', 'http://localhost:3000/posts');
    cy.get("#feed").should("contain", "This is a test post");
  });
});