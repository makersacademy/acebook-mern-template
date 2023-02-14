describe("post function", () => {
  before(() => {
    cy.exec('mongo acebook_test --eval "db.posts.remove({})"')
    cy.signup("someone@example.com", "password", "John", "Smith");
  });

  it("tests to see if a posts can be deleted", () => {
    cy.visit('/login');
    cy.get('#email').click();
    cy.get('#email').type('someone@example.com');
    cy.get('#password').click();
    cy.get('#password').type('password');
    cy.get('#submit').click();
    cy.get('#message').click();
    cy.get('#message').type('This is a test post');
    cy.get('#submitPost').click();
    cy.url().should('contains', 'http://localhost:3000/posts');
    cy.get('[data-cy="post"]:nth-child(1) button:nth-child(2)').click();
    cy.get('[data-cy="post"]:nth-child(1)').should('not.exist');
  });
});
