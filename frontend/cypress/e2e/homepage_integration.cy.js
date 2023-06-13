describe("Visiting homepage", () => {
  it("takes user to login when button clicked", () => {
    cy.visit("/");
    cy.get("#login-btn").click();
    cy.url().should("include", "/login");
  })

  it("takes user to signup when button clicked", () => {
    cy.visit("/");
    cy.get("#signup-btn").click();
    cy.url().should("include", "/signup");
  })

  it("redirects to posts if user is logged in", () => {
    cy.visit("/signup");
    cy.get("#email").type("test@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    cy.url().should("include", "/login");
    
    cy.visit("/login");
    cy.get("#email").type("test@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    cy.url().should("include", "/posts");
    
    cy.visit("/");
    cy.wait(1000);
    cy.url().should("include", "/posts");
  })
})
