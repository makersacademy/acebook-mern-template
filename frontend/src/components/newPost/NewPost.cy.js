import NewPost from "./NewPost"
const navigate = () => {};

describe("Feed", () => {
    beforeEach(() => {
      window.localStorage.setItem("token", "fakeToken");
    });
  
    it("should have a clickable 'add to feed' button", () => {
        cy.mount(<NewPost navigate={navigate} />);
        cy.get(".button")
          .should("contain.text", "Add to Feed")
          .should("be.visible")
          .should("be.enabled");
      });
    })