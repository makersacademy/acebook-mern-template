import SignUpForm from './SignUpForm'
const navigate = () => {}

describe("Signing up", () => {
  it("calls the /users endpoint", () => {
    cy.mount(<SignUpForm navigate={navigate}/>)

    cy.intercept('GET', '/users', { statusCode: 200, body: [{email: 'other@example.com'}]}).as('getUsersRequest');
    cy.intercept('POST', '/users', { message: "OK" }).as("signUpRequest")
    
    cy.get("#username").type("James Bond")
    cy.get("#email").type("james_bond@example.com");
    cy.get("#password").type("password1!");
    cy.get("#password_confirmation").type("password1!");
    cy.get("#submit").click();
   
    cy.wait('@signUpRequest').then(interception => {
      expect(interception.response.body.message).to.eq("OK");
    })
  })
  it("throws error when email is not unique", () => {
    cy.mount(<SignUpForm navigate={navigate}/>)

    cy.get("#username").type("someone");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password1!");
    cy.get("#password_confirmation").type("password1!");
    cy.get("#submit").click();

    cy.get("#username").type("someone");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password1!");
    cy.get("#password_confirmation").type("password1!");
    cy.get("#submit").click();
    cy.on('window:alert', (str) => {
      // Assert that the alert message contains the expected error message
      expect(str).to.include('Email must be unique!');
    });

    
  }); 
})
