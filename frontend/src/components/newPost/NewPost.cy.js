import NewPost from "./NewPost"
const navigate = () => {};

describe("Feed", () => {
    beforeEach(() => {
      window.localStorage.setItem("token", "fakeToken");
    });
  
    it("should have a clickable 'add to feed' button", () => {
        cy.mount(<NewPost navigate={navigate} />);
        cy.get(".submit-button")
          .should("contain.text", "Add to Feed")
          .should("be.visible")
          .should("be.enabled");
      });

    it ("should have a form for submitting written text", () => {
        cy.mount(<NewPost navigate={navigate} />);
        cy.get(".new-post-form")
            .should("contain.text", "Tell people how you're feeling...");


    })
    })