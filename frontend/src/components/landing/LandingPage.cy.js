import LandingPage from "./LandingPage";

describe("LandingPage", () => {
  it("renders a LandingPage with HTML", () => {
    cy.mount(<LandingPage />);
    cy.get(".landing-header").should("contain.text", "ACEBOOK");
    cy.get(".landing-text")
      .should("be.visible")
      .should("contain.text", "Miaow then turn around");
    cy.get(".button")
      .should("contain.text", "Sign up")
      .should("be.visible")
      .should("be.enabled");
  });
});
