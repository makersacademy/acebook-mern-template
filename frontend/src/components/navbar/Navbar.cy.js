import Navbar from "./Navbar";
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter

const navigate = () => {};

describe("Navbar functionality - logged out", () => {
  });
  it("Acebook button", () => {
    cy.mount(<Router><Navbar navigate={navigate}/></Router>)
    cy.get('[id="acebook"]').should("contain.text", "Acebook");
    cy.get('[id="acebook"]').click();
    cy.url().should('include', '/');
  });

describe("Navbar functionality - logged in", () => {
  });
  it("Acebook button", () => {
    window.localStorage.setItem("token", "fakeToken");
    cy.mount(<Router><Navbar navigate={navigate}/></Router>)
    cy.get('[id="acebook"]').should("contain.text", "Acebook");
    cy.get('[id="acebook"]').click();
    // cy.url().should('include', '/posts', { timeout: 1000 });
  });
  it("Posts button", () => {
    window.localStorage.setItem("token", "fakeToken");
    cy.mount(<Router><Navbar navigate={navigate}/></Router>)
    cy.get('[id="posts"]').should("contain.text", "Posts");

  });
  it("Logout button", () => {
    window.localStorage.setItem("token", "fakeToken");
    cy.mount(<Router><Navbar navigate={navigate}/></Router>)
    cy.get('[id="logout"]').should("contain.text", "Logout");
    cy.get('[id="logout"]').click();
    cy.url().should('include', '/');
  });
