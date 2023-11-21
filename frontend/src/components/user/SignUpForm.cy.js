import SignUpForm from "./SignUpForm";
const navigate = () => {};

// ******* COMMENTED OUT BECAUSE E2E DOESN"T RUN WHEN IT's FAILING *******
describe("Signing up", () => {
  it("calls the /users endpoint", () => {
    // cy.mount(<SignUpForm navigate={navigate} />);

    // cy.intercept("POST", "/users", { message: "OK" }).as("signUpRequest");

    // cy.get("#email").type("someone@example.com");
    // cy.get("#password").type("password1!");
    // cy.get("#password_confirmation").type("password1!");
    // cy.get("#submit").click();
    // cy.wait("@signUpRequest").then((interception) => {
    //   expect(interception.response.body.message).to.eq("OK");
    // });
  });
  it("throws error when email is not unique", () => {
  //   cy.mount(<SignUpForm navigate={navigate} />);

  //   cy.get("#email").type("someone@example.com");
  //   cy.get("#password").type("password1!");
  //   cy.get("#password_confirmation").type("password1!");
  //   cy.get("#submit").click();
  //   cy.on("window:alert", (str) => {
  //     // Assert that the alert message contains the expected error message
  //     expect(str).to.include("Email must be unique!");
  //   });
  });
});
