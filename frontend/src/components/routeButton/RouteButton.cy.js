import RouteButton from "./RouteButton";

describe("RouteButton", () => {
  it("renders a Button with HTML", () => {
    cy.mount(<RouteButton />);
    cy.get(".route-button")
      .should("be.visible")
      .should("be.enabled");
  });
});