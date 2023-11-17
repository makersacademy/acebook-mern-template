import LikeButton from "./likeButton";

describe("Like Button", () => {
    it('renders on page', () => {
    cy.mount(<LikeButton />);
    cy.get('.likeButton').should('exist');
    })

    it('adds one to the like count', () => {
    cy.mount(<LikeButton />);
    cy.get('small').should('contain.text', '0');
    cy.get('.likeButton').click();
    cy.get('small').should('contain.text', '1');
    })

    it('resets to zero when clicked if value is one', () => {
        cy.mount(<LikeButton />);
        cy.get('.likeButton').click();
        cy.get('.likeButton').click();
        cy.get('small').should('contain.text', '0');
        })
})