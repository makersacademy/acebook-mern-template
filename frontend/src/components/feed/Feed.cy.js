import Feed from './Feed'
const navigate = () => {}

describe("Feed", () => {
  it("Calls the /posts endpoint and lists all the posts with date", () => {
    window.localStorage.setItem("token", "fakeToken")
    
    cy.intercept('GET', '/posts', (req) => {
        req.reply({
          statusCode: 200,
          body: { posts: [
            {_id: 1, message: "Hello, world", date: "2023-11-15T16:38:35.366Z" },
            {_id: 2, message: "Hello again, world", date: "2023-10-15T16:38:35.366Z"}
          ] }
        })
      }
    ).as("getPosts")

    cy.mount(<Feed navigate={navigate}/>)
    
    cy.wait("@getPosts").then(() =>{
      cy.get('[data-cy="post"]')
      .should('contain.text', "Hello, world")
      .should('contain.text', "2023-11-15T16:38:35.366Z")
      .and('contain.text', "Hello again, world")
      .and('contain.text', "2023-10-15T16:38:35.366Z")
    })
  })
})

describe("Chronological Feed", () => {
  it("Calls the /posts endpoint and lists all the posts sorted by the date", () => {
    window.localStorage.setItem("token", "fakeToken")
    
    cy.intercept('GET', '/posts', (req) => {
        req.reply({
          statusCode: 200,
          body: { posts: [
            {_id: 1, message: "1", date: "2023-11-15T16:38:35.366Z" },
            {_id: 2, message: "2", date: "2023-10-15T16:38:35.366Z"},
            {_id: 3, message: "3", date: "2023-10-15T13:38:35.366Z" },
            {_id: 4, message: "4", date: "2023-10-16T16:38:35.366Z"},
            {_id: 5, message: "5", date: "2023-11-15T10:38:35.366Z" },
            {_id: 6, message: "6", date: "2023-09-15T16:38:35.366Z"}
          ] }
        })
      }
    ).as("getPosts")

    cy.mount(<Feed navigate={navigate}/>)
    
    cy.wait("@getPosts").then(() =>{
      const reverseChronologicalMessages = ["1", "5", "4", "2", "3", "6"];

      cy.get('[data-cy="post"]').each(($post, index) => {
        cy.wrap($post).should('contain.text', `${reverseChronologicalMessages[index]}`);
      });
    });
  });
})
