describe("Creating a post", () => {
    before(() => {
      // Create a new user through signup
        //  cy.signup("someuser", "test2", "password1!");
      // Visit the login page and sign in
      cy.visit('/login');
      cy.get("#email").type("do_not_delete");
      cy.get("#password").type("password1!");
      cy.get("#submit").click();
      cy.url().should("include", "/posts");
  });
  
    it("should display a new post with image in the feed below after submitting", () => {
      // visit posts page
      cy.visit("/posts");
    
        // create fixture to mock the image
    cy.fixture('test_image.png').then(fileContent => {
        cy.get('[data-cy="new-post-input"]').type("This is a new post");
        // used cypress-file-upload command to mock file
        // https://www.npmjs.com/package/cypress-file-upload
        cy.get('[data-cy="file-input"]').attachFile({
          fileContent: fileContent.toString(),
          fileName: 'test_image.png',
          mimeType: 'image/png'
        });
        cy.get('[data-cy="post-form"]').submit();
    });
      cy.contains("This is a new post", { timeout: 10000 }).should("be.visible");
    });
  });