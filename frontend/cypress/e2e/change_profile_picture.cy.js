import 'cypress-file-upload';

describe("Change Profile Picture", () => {
  it("login and make an image post", () => {
    cy.visit("/");
    cy.contains("Sign Up").click();
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#username").type("username");
    cy.get("#submit").click();
    cy.contains("Log In").click();
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    cy.contains("Profile").click();

    cy.contains("Change Image").click();
    cy.get("input[type='file']").attachFile("../fixtures/VOID");
    const source = 
    cy.contains("Update Profile Image").click();
    // cy.get(".profile-photo").should("contain", "blob:http://localhost:3000/b9a9f216-4f21-4c47-9682-fd78e9c29109");

    cy.get('.profile-picture').should('have.attr', 'src', 'blob:http://localhost:3000/a741f8db-185c-45dd-a3c1-ca7199110b41');
  });
});
