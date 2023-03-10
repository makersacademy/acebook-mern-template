import CreatePost from "./CreatePost";
const fetchData = () => {};
describe("CreatePost", () => {
  it("Calls the /posts endpoint and successfully creates a post", () => {
    cy.mount(<CreatePost fetchData={fetchData} />);
    cy.intercept("POST", "/posts", {
      statusCode: 201,
      body: {
        message: "OK",
      },
    }).as("createPost");
    cy.get("#message").type("Test message");
    cy.get("#submit").click();

    cy.wait("@createPost").then((interception) => {
      expect(interception.response.body.message).to.eq("OK");
    });
  });
});
