describe("post function", () => {
  before(() => {
    cy.signup("someone@example.com", "password", "John", "Smith");
  });

it("allows the user to like a post", () => {
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
      cy.get('[data-cy="post"]:nth-child(1) #like').click();
      cy.get(".likesText").should("contain.text", "Likes: 1");
    });

  it("allows the user to unlike a post", () => {
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
    cy.get('[data-cy="post"]:nth-child(1) #like').click();
    cy.get('[data-cy="post"]:nth-child(2) #unlike').click();
    cy.get(".likesText").should("contain.text", "Likes: 0");

  });
});
