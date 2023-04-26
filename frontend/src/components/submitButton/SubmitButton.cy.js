import SubmitButton from "./SubmitButton";

describe("Button", () => {
  it("renders a Button with HTML", () => {
    cy.mount(<SubmitButton />);
    cy.get(".submit-button")
      .should("be.visible")
      .should("be.enabled");
  });
});