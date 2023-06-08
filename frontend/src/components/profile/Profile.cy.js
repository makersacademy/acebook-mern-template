import Profile from './Profile'
const navigate = () => {}
const useParams = () => {}

describe("Profile", () => {
  xit("Calls the /user endpoint and shows the name and username", () => {
    window.localStorage.setItem("token", "fakeToken")

    cy.intercept('GET', '/user/fakeyfake', (req) => {
        req.reply({
          statusCode: 200,
          body: {
            firstName: "Fakey",
            lastName: "Fakeson",
            userName: "fakeyfake",
          }
        })
      }
    ).as("getUser")

    cy.mount(<Profile navigate={navigate} useParams={useParams}/>)

    cy.wait("@getUser").then(() => {
      cy.get('[data-cy="profile"]')
      .should('contain.text', 'Fakey')
      .and('contain.text', 'Fakeson')
      .and('contain.text', 'fakeyfake')
    })
  })
})