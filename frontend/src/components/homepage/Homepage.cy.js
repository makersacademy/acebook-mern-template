import Homepage from "./Homepage";
const navigate = () => {}

describe("Visiting the homepage", () => {
  it("should show the log in / sign up buttons if not logged in", () => {
    cy.mount(<Homepage navigate={navigate} />)

    cy.get("#login-btn").should("be.visible")
    .should('contain.text', "Log in!")

    cy.get("#signup-btn").should("be.visible")
    .should('contain.text', "Sign up!")
  })

  // it("should navigate to log in page when button clicked", () => {
  //   cy.mount(<Homepage navigate={navigate} />)

  //   cy.get("#login-btn")
  //   .click()
  //   // cy.on("url:changed", (newUrl) => {
  //   //   expect(newUrl).to.contain("/login")
  //   //   cy.url().should("include", "/login")
  //   // })
  // })

  // xit("should navigate to sign up page when button clicked", () => {
  //   cy.mount(<Homepage navigate={navigate} />)

  //   cy.get("#signup-btn").click()

  //   cy.on("url:changed", (newUrl) => {
  //     expect(newUrl).to.contain("/signup")
  //     cy.url().should("include", "/signup")
  //   })
  // })

  // xit("should redirect to posts if user is logged in", () => {
  //   window.localStorage.setItem("token", "fakeToken")

  //   cy.mount(<Homepage navigate={navigate} />)

  //   cy.url().should("include", "/posts");
  // })
})