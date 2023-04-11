import Feed from './Feed'
const navigate = () => {}

describe("Feed", () => {
  it("Calls the /posts endpoint and lists all the posts in chronological order", () => {
    window.localStorage.setItem("token", "fakeToken");

    cy.intercept('GET', '/posts', (req) => {
      req.reply({
        statusCode: 200,
        body: { posts: [
          {_id: 1, message: "Hello, world", dateCreated: 1620000000},
          {_id: 2, message: "Hello again, world", dateCreated: 1621000000}
        ] }
      })
    }).as("getPosts");

    cy.mount(<Feed navigate={navigate}/>);

    cy.wait("@getPosts").then(() =>{
      cy.get('[data-cy="post"]')
        .should('have.length', 2)
        .then(($posts) => {
          const dates = $posts.map((i, el) => Cypress.$(el).find('[data-cy="dateCreated"]').text());
          const sortedDates = [...dates].sort((a, b) => new Date(b) - new Date(a));
          expect(dates.get()).to.deep.equal(sortedDates);
        });
    });
  });
});

