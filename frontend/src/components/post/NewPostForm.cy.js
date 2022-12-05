import NewPostForm from "./NewPostForm";

const navigate = () => {};

describe("Making New Post", () => {
  it("Calls the /new_post endpoint", () => {
    
    cy.intercept("POST", "/posts", { message: "OK" }).as("newPostRequest");
    
    cy.mount(<NewPostForm navigate={navigate} />);

    cy.get("#content").type("Fake content");
    cy.get("#submit").click();
    cy.wait("@newPostRequest").then((interception) => {
      expect(interception.response.body.message).to.eq("OK");
    });
  });
});
