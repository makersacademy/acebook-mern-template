import Feed from "./Feed";
const navigate = () => {};

describe("Feed", () => {
  it("Calls the /posts endpoint and lists all the posts", () => {
<<<<<<< HEAD
    window.localStorage.setItem("token", "fakeToken")

    
    cy.intercept('GET', '/posts', (req) => {
        req.reply({
          statusCode: 200,
          body: { posts: [
            {_id: 1, message: "Hello, world"},
            {_id: 2, message: "Hello again, world"}
          ] }
        })
      }
    ).as("getPosts")
    
    //line below has been moved due to cy.intercept not intercepting in time
    cy.mount(<Feed navigate={navigate}/>)

    cy.wait("@getPosts").then(() =>{
=======
    window.localStorage.setItem("token", "fakeToken");

    cy.intercept("GET", "/posts", (req) => {
      req.reply({
        statusCode: 200,
        body: {
          posts: [
            { _id: 1, message: "Hello, world" },
            { _id: 2, message: "Hello again, world" },
          ],
        },
      });
    }).as("getPosts");

    cy.mount(<Feed navigate={navigate} />);

    cy.wait("@getPosts").then(() => {
>>>>>>> main
      cy.get('[data-cy="post"]')
        .should("contain.text", "Hello, world")
        .and("contain.text", "Hello again, world");
    });
  });
});
