import Navbar from "./Navbar";
import { BrowserRouter as Router } from "react-router-dom";
const navigate = () => {};

describe("Navbar", () => {
  it("Renders the Acebook title and login/signup links when not logged in", () => {
    cy.mount(
      <Router>
        <Navbar navigate={navigate} />
      </Router>
    );
    window.localStorage.removeItem("token");
    cy.get("[data-cy='h1']").should("contain", "Acebook");
    cy.get("[data-cy='nav']")
      .should("contain", "Login")
      .and("contain", "Signup");
  });

  it("Renders the Acebook title and logout button when logged in", () => {
    cy.mount(
      <Router>
        <Navbar navigate={navigate} />
      </Router>
    );
    window.localStorage.setItem("token", "fakeToken");
    cy.get("[data-cy='h1']").should("contain", "Acebook");
    cy.get("[data-cy='nav']").should("contain", "Log out");
  });

  it("removes localStorage token when logout button clicked", () => {
    cy.mount(
      <Router>
        <Navbar navigate={navigate} />
      </Router>
    );
    window.localStorage.setItem("token", "fakeToken");
    cy.get("[data-cy=logout]").click();

    cy.wait(1000).then(() => {
      expect(localStorage.getItem("token")).to.be.null;
    });
  });
});
