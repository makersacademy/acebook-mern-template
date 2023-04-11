const navigate = () => {};

describe("NavBar", () => {
  it("displays the Acebook logo"), () => {
    cy.mount(<NavBar navigate={useNavigate()}/>);
    cy.get('[data-cy="logo-container"]')
    .find("img").should('be.visible');
  };
});
