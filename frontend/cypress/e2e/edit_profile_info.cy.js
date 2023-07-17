describe("Edit Profile Info", () => {
  it("Changes the user's name and bio", () => {
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
    
    cy.contains("Edit Profile").click();
    cy.get(".profile-info-input").type("My New Name");
    cy.get(".profile-info-textarea").type("My New Bio");
    cy.contains("Update Profile Info").click();

    cy.contains("My New Name").should("be.visible");
    cy.contains("My New Bio").should("be.visible");
  });
});