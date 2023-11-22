import Profile from './Profile'
import { BrowserRouter as Router } from 'react-router-dom';

describe("Profile", () => {
  beforeEach(() => {
    window.localStorage.setItem("token", "fakeToken");
    cy.intercept('GET', '/users/display-name', {
      statusCode: 200,
      body: { 
        displayName: "John Doe"
      }
    }).as("getUserProfile");

    cy.mount(
      <Router>    
        <Profile navigate={() => {}}/>
      </Router>
    );
  });

  it("Displays the user's display name correctly", () => {
    cy.wait("@getUserProfile");
    cy.get('h2').should('contain.text', "Profile Name: John Doe");
  });
});
