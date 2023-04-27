import Navbar from './Navbar';
import { BrowserRouter as Router} from "react-router-dom";


const location = () => {}
describe("Navbar", () => {
  it("renders the Acebook title and a link to the login page on the landing page", () => {
    cy.mount(
                <Router>
                    <Navbar location="/"/>
                </Router>
            );
    cy.clearLocalStorage("token")
    cy.get('[data-cy="logo"]')
    cy.get('[data-cy="login"]')
    .should('contain', "Log In")
    cy.screenshot()
    })

    it("renders the Acebook title and a link to the signup page on the login page when the user is not logged in", () => {
        cy.mount(
                    <Router>
                        <Navbar location="/login"/>
                    </Router>
                );
        cy.clearLocalStorage("token")
        cy.get('[data-cy="logo"]')
        cy.get('[data-cy="signup"]')
        .should('contain', "Sign Up")
        cy.screenshot()
        })

    it("renders the Acebook logo and the profile and signout links when the user is logged in and on feed", () => {
        cy.mount(
                    <Router>
                        <Navbar location="/posts"/>
                    </Router>
                );
        window.localStorage.setItem("token", "fakeToken")
        cy.get('[data-cy="logo"]')
        cy.get('[data-cy="connect"]')
        .should('contain', "Connect")
        cy.get('[data-cy="profile"]')
        .should('contain', "Profile")
        cy.get('[data-cy="logout"]')
        .should('contain', "Sign Out")
    })

    it("renders the Acebook logo and main nav bar when the user is logged in and on a page that is not feed", () => {
        cy.mount(
                    <Router>
                        <Navbar location="/profile"/>
                    </Router>
                );
        window.localStorage.setItem("token", "fakeToken")
        cy.get('[data-cy="logo"]')
        cy.get('[data-cy="connect"]')
        .should('contain', "Connect")
        cy.get('[data-cy="feed"]')
        .should('contain', "Feed")
        cy.get('[data-cy="profile"]')
        .should('contain', "Profile")
        cy.get('[data-cy="logout"]')
        .should('contain', "Sign Out")
    })

    it("renders the Acebook logo and the feed, profile and signout links when the user is logged in and on the Connects page", () => {
        cy.mount(
                    <Router>
                        <Navbar location="/connect"/>
                    </Router>
                );
        window.localStorage.setItem("token", "fakeToken")
        cy.get('[data-cy="logo"]')
        cy.get('[data-cy="feed"]')
        .should('contain', "Feed")
        cy.get('[data-cy="profile"]')
        .should('contain', "Profile")
        cy.get('[data-cy="logout"]')
        .should('contain', "Sign Out")
    })

    it("navigates the user to the feed page when they are logged in and click the Acebook logo", () => {
        cy.mount(
                    <Router>
                        <Navbar location="/connect"/>
                    </Router>
                );
        window.localStorage.setItem("token", "fakeToken")
        cy.get('[data-cy="logo"]').click()
        cy.url().should('contain', '/posts')  
    })

    it("navigates the user to the landing page when they are not logged in and click the Acebook logo", () => {
        cy.mount(
                    <Router>
                        <Navbar location="/login"/>
                    </Router>
                );
        cy.clearLocalStorage("token")
        cy.get('[data-cy="logo"]').click()
        cy.url().should('contain', '/')  
    })

    it("removes the token when the user clicks the signout button", () => {
        cy.mount(
                    <Router>
                        <Navbar location="/posts"/>
                    </Router>
                );
        window.localStorage.setItem("token", "fakeToken")
        cy.get('[data-cy="logout"]').click()
        cy.wait(10000).should(() => {
            expect(localStorage.getItem("token", "fakeToken")).to.be.null;
        })
    
    })
})
