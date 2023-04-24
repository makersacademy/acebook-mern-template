import LandingPage from "./LandingPage";

describe("LandingPage", () => {
  it("renders a LandingPage with HTML", () => {
    cy.mount(<LandingPage />);
    cy.get(".header").should("contain.text", "LandingPage");
    cy.get(".text")
      .should("be.visible")
      .should("contain.text", "Miaow then turn around");
    cy.get(".user-btn")
      .should("contain.text", "Sign up")
      .should("be.visible")
      .should("be.enabled");
  });
});
