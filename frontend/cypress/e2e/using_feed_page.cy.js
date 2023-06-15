describe("Signing in", () => {

    before(() => {
      cy.signup("User", "user@email.com", "12345678");
      cy.login("user@email.com", "12345678");
    });
  
    it("creates a new post", () => {
      cy.get("#newPost").type("Let's chat!");
      cy.get("#post-submit").click();
  
      // cy.contains('div.message', "Let's chat!").should('be.visible');
      cy.contains("Let's chat!");
    });
  
    it("throws an error if the user posts nothing", () => {
      cy.get("#post-submit").click();
  
      cy.contains('p.validation-error', "Please enter a message to post").should('be.visible');
    })

    it("displays your like when you like a post", () => {
      cy.get("#newPost").type("Let's chat!");
      cy.get("#post-submit").click();
      cy.get(".like-button:first").click();
  
      cy.contains('div.likes', "1").should('be.visible');
    })
  
    it("returns to login page after clicking logout", () => {
      cy.get(".logout").click();
  
      cy.url().should("include", "/login")
    })

    it("you can write a comment on a post", () => {

    });

    it("you can make a post with a picture", () => {
      cy.get("#newPost").type("Let's chat!");
      cy.get().includes("https://res.cloudinary.com/acebook/image/upload/v1686824029/tnckfiyuwxsqigfztbuv.webp")
      cy.get("#post-submit").click();

      cy.contains("Let's chat!");
      cy.contains()
    });

    it("stops you from posting a picture if it doesn't have a caption", () => {

    });
  });

/*
import cloudinaryUpload from 'cypress-cloudinary-upload';

cloudinaryUpload.configure({
  cloudName: 'YOUR_CLOUD_NAME',
});

describe('Image Upload', () => {
  it('should mock image upload', () => {
    cy.visit('/your-page-with-image-upload');

    const mockResponse = {
      public_id: 'your-mocked-public-id',
      url: 'your-mocked-url',
      // Add any other desired properties
    };

    cy.route('POST', 'https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload', mockResponse).as('imageUpload');

    cy.get('input[type="file"]').attachFile('test-image.jpg');

    // Wait for the image upload to complete
    cy.wait('@imageUpload').then((xhr) => {
      // Access the mocked response
      const response = xhr.responseBody;
      
      // Assertions or further test steps after the upload
    });
  });
});
*/
