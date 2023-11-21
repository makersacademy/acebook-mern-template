import Profile from "./Profile";
const navigate = () => {};

describe("Profile", () => {
  it("Calls the /api/users/:userId endpoint to show user Profile", () => {
    window.localStorage.setItem("token", "fakeToken");

    cy.intercept("GET", "/api/users/**", (req) => {
      req.reply({
        statusCode: 200,
        body: {
          user: {
            id: "655b49f5c89b0482771b8a0c",
            email: "test@test.com",
            followers: [],
            comments: [],
            posts: [],
            firstName: "Name",
            lastName: "Last Name"
          },
        },
      });
    }).as("getUser");

    cy.mount(<Profile navigate={navigate} />);

    cy.wait("@getUser").then(() => {
      cy.get('[data-cy="names"]')
        .should("contain.text", "Name")

    });
  });
});
