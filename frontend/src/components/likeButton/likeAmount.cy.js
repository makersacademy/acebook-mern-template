import LikeAmount from "./likeAmount";

describe("Like Amount", () => {
    it('renders on page', () => {
    cy.mount(<LikeAmount />);
    cy.get('.likes_amount').should('exist');
    })

    it('adds one to the like count', () => {
    cy.mount(<LikeAmount />);
    cy.get('.likes_amount').should('contain.text', '0');
    })
})