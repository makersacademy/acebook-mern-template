import AvatarChoiceForm from './AvatarChoiceForm';
import SignUpForm from './SignUpForm';
import { useLocation } from "react-router-dom";


const navigate = () => {}
const location = () => {}

describe("Choosing avatar", () => {
  it("successfully signs up and chooses avatar", () => {

    // Mount the AvatarChoiceForm component
    cy.mount(<AvatarChoiceForm navigate={navigate} location={location} />);
    // Intercept the avatar choice request
    cy.intercept("POST", "/users/avatar", { status: 201, body: { message: "OK" } }).as("avatarRequest");

    // Perform actions on the AvatarChoiceForm (e.g., choose an avatar)
    cy.get("#avatar1").click();
    cy.get("#submit").click();

    // Wait for the avatar choice request to complete
    cy.wait("@avatarRequest").then((interception) => {
      expect(interception.response.body.message).to.eq("OK");
    });
  });
});
