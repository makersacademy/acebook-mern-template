describe("Signing in", () => {

    before(() => {
      cy.signup("user@email.com", "12345678")
    })

    it("Displays the navbar before logging in", () => {
        cy.visit("/");
        cy.get("a:contains(Acebook)").should("be.visible");
      });


    it("Displays the navbar after logging in", () => {
        cy.visit("/login");
        cy.get("#email").type("someone@example.com");
        cy.get("#password").type("password");
        cy.get("#submit").click();
        cy.get("a:contains(Acebook)").should("be.visible");
      });

    
      it("Displays the navbar after logging in", () => {
        cy.visit("/login");
        cy.get("#email").type("someone@example.com");
        cy.get("#password").type("password");
        cy.get("#submit").click();
        cy.get("button:contains(Log Out)").should("be.visible");
      });

          
      it("Displays the login / signup before logging in", () => {
        cy.visit("/");
        cy.get("a:contains(Login)").should("be.visible");
        cy.get("a:contains(Sign Up)").should("be.visible");
      });
    
    });