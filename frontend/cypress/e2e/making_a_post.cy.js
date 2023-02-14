describe("post function", () => {
  before(() => {
    cy.signup("someone@example.com", "password", "John", "Smith");
  });

  it("tests to see if the post button and box works properly", () => {
    // need to login in from the login page
    cy.visit("/login");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    cy.get("#message").type("cypress test 2");
    cy.get("#submit").click();
    cy.url().should("include", "/posts");
    cy.get("#feed").should("contain", "cypress test 2");
  });
});
describe("post function", () => {

  before(() => {
    cy.signup("someone@example.com", "password", "John", "Smith")
  })

it("tests to see if the post button and box works properly", () => {
    // need to login in from the login page
    cy.visit('/login');
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    cy.get('#message').type('cypress test 2');
    cy.get('#submit').click();
    cy.url().should('include', '/posts');    
    cy.get('#feed').should('contain', 'cypress test 2')
  })
  it("tests to see if the post button and box works properly", () => {
    // need to login in from the login page
    cy.visit('/login');
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    cy.get('#message').type('cypress test 2');
    cy.get('#submit').click();
    cy.url().should('include', '/posts');    
    cy.get('#feed').should('contain', '2023-02-14')
  })
});
