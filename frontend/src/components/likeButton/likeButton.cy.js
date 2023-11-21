import LikeButton from "./likeButton";

describe("Like Button", () => {
    it('renders on page', () => {
    cy.mount(<LikeButton />);
    cy.get('.likeButton').should('exist');
    })
})