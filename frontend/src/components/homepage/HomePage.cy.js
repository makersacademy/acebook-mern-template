import HomePage from "./HomePage";
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter

describe("HomePage", () => {
  // Wrap HomePage component in a Router component in order for UseNavigate to work properly in Homepage component
  it("renders the HomePage with a login button and signup button", () => {
    cy.mount(
      <Router>
        <HomePage />
      </Router>,
    );
    cy.get('[id="login-button"]').should("contain.text", "Log in");
    cy.get('[id="signup-button"]').should("contain.text", "Create an account");
  });
  it("directs the user to the login page when login button is clicked", () => {
    cy.mount(
      <Router>
        <HomePage />
      </Router>,
    );
    cy.get('[id="login-button"]').click();
    cy.url().should("include", "/login");
  });
  it("directs the user to the signup page when create new account button is clicked", () => {
    cy.mount(
      <Router>
        <HomePage />
      </Router>,
    );
    cy.get('[id="signup-button"]').click();
    cy.url().should("include", "/signup");
  });
  it("redirects the user to /posts if they try to access / when logged in", () => {
    // sets the token so user seems logged in
    window.localStorage.setItem("token", "fakeToken");
    cy.mount(
      <Router>
        <HomePage />
      </Router>,
    );
    cy.url().should("include", "/posts");
  });
});
