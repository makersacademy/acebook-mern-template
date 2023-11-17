import HomePage from "./HomePage";

describe("HomePage", () => {
  it("renders the HomePage with a login button", () => {
    cy.mount(<HomePage />);
    cy.get('[id="login-button"]').should("contain.text", "Log in");
  });
});
