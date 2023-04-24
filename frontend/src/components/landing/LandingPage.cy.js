import LandingPage from './LandingPage'

describe("LandingPage", () => {
  it('renders a LandingPage with HTML', () => {
    cy.mount(<LandingPage />);
    cy.get('.header').should('contain.text', "LandingPage")
  })
})