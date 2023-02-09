import PostForm from "./PostForm";

describe("Post form", () => {
    beforeEach(() => {
      //Reset localStorage before each test
      window.localStorage.clear();
    });
  
    it("should post a new message when submitted", () => {
      const token = "token123";
      window.localStorage.setItem("token", token);
      cy.visit("/new-post");
  
      cy.server()
      cy.route("POST", "/posts").as("post")
      cy.get("#post").type("My new post");
      cy.get("button[type='submit']").click();
  
      cy.wait("@post").then(xhr => {
        expect(xhr.method).to.equal("POST");
        expect(xhr.request.body).to.contain({message: "My new post"});
        expect(xhr.request.headers).to.have.property("Authorization")
          .that.equals(`Bearer ${token}`);
      });
    });
  });
  