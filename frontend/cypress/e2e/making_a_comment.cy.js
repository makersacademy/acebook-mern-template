describe("Creating a comment", () => {

    before(() => {

        // Create a new user through signup
        cy.signup("someuser", "someone@example.com", "password1!");

        // Visit the login page and sign in
        cy.visit('/login');
        cy.get("#email").type("someone@example.com");
        cy.get("#password").type("password1!");
        cy.get("#submit").click();
        cy.url().should("include", "/posts");
        cy.get('[data-cy="new-post-input"]').type('Post 1 for test');
        cy.get('[data-cy="post-form"]').submit();
        cy.contains('Post 1 for test', { timeout: 10000}).should('be.visible');
    });

    it.only('should display a message when there is no comment on a post', () => {
        cy.visit('/posts');
        cy.url().should("include", "/posts");
        cy.contains('No one has commented yet - be the first!', { timeout: 10000}).should('be.visible');
    });

    it('should display a new comment after submitting', () => {
        cy.visit('/posts');

        //enter a comment in the input box
        cy.get('[data-cy="new-comment-input"]').first().type('Test comment');

        // Submit the form
        cy.get('[data-cy="comment-form"]').first().submit();

        //check the comment appears in the feed
        cy.contains('Test comment', { timeout: 10000}).should('be.visible');
    });


    // it.only('should display a new comment underneath the post which it is commenting on', () => {
    //     // visit posts page
    //     cy.visit('/posts');

    //     // makes another 2 posts to comment on
    //     cy.get('[data-cy="new-post-input"]').type('Post number 2 for test');
    //     cy.get('[data-cy="post-form"]').submit();
    //     cy.contains('Post number 2 for test', { timeout: 3000}).should('be.visible');

    //     cy.get('[data-cy="new-post-input"]').type('Post number 3 for test');
    //     cy.get('[data-cy="post-form"]').submit();
    //     cy.contains('Post number 3 for test', { timeout: 3000}).should('be.visible');

    //     //enter a comment in the input box of post 2

    //     cy.get('[data-cy="new-comment-input"]').eq(1).type('Here is a comment specifically for post 2');

    //     // Submit the form
    //     cy.get('[data-cy="comment-form"]').eq(1).submit();

    //     //check the comment appears in the feed

    //     cy.contains('Post number 2 for test').within(() => {
    //         cy.contains('Here is a comment specifically for post 2', { timeout: 3000}).should('be.visible');
    //     })

    //     // checks the comment does NOT appear on the wrong post
    //     cy.contains('Post number 3 for test').within(() => {
    //         cy.contains('Here is a comment specifically for post 2', { timeout: 3000}).should('not.be.visible');
    //     })
    // });

});



