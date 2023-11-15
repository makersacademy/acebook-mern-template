describe('App', () => {
    it('redirects to /login when user is not logged in', () => {
        cy.visit('/');
        cy.url().should('include', '/login');
    });

    it('redirects to /posts when user is logged in', () => {
        cy.visit('/');
        cy.login('someone@example.com', 'password');
        cy.wait(7000); // wait for 7 seconds
        cy.url().should('include', '/posts');
    });
});