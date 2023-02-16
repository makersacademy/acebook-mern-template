import { MemoryRouter } from "react-router-dom";
import PulldownMenu from "./PulldownMenu";

describe("PulldownMenu", () => {
  //#1
  it("finds loggout img", () => {
    cy.mount(
      <MemoryRouter>
        <PulldownMenu />
      </MemoryRouter>
    );

    cy.get("div").find("img");
  });

  //#2
  it("confirms that PulldownMenu contains the string Account", () => {
    cy.mount(
      <MemoryRouter>
        <PulldownMenu />
      </MemoryRouter>
    );

    cy.get("span").contains("Account");
  });

  //#3
  it("confirms that PulldownMenu contains the string Profile", () => {
    cy.mount(
      <MemoryRouter>
        <PulldownMenu />
      </MemoryRouter>
    );

    cy.get("span").contains("Profile");
  });
});
