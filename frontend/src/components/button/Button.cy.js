import Button from "./Button";

describe("Button", () => {
  it("renders a Button with HTML", () => {
    cy.mount(<Button />);
    cy.get(".button")
      .should("be.visible")
      .should("be.enabled");
  });
});