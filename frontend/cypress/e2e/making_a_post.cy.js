

describe("Creating a post", () => {

    before(() => {
        // Create a new user through signup
        cy.signup("someone@example.com", "password");
        // Visit the login page and sign in
        cy.visit('/login');
        cy.get("#email").type("someone@example.com");
        cy.get("#password").type("password");
        cy.get("#submit").click();
        cy.url().should("include", "/posts");
    });


    it('should display a new post in the feed below after submitting', () => {
        // visit posts page
        cy.visit('/posts');

        //check if no posts available displays when feed is empty
        //cy.contains('No posts yet :(').should('be.visible');

        //enter a post in the input box
        cy.get('input[type="text"]').type('This is a new post');

        //submit the form 
        cy.get('form').submit();

        //check the post appears in the feed
        cy.contains('This is a new post', { timeout: 10000}).should('be.visible');
    });
});