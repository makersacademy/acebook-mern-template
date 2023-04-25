import Navbar from './Navbar';
import { BrowserRouter as Router} from "react-router-dom";





// TEST WORKS (1)
const location = () => {}
describe("Navbar", () => {
  it("renders the Acebook title and a link to the login page", () => {
    cy.mount(
                <Router>
                    <Navbar/>
                </Router>
            );
    cy.clearLocalStorage("token")
    cy.get('[data-cy="logo"]')
    .should('contain', "Acebook")
    cy.get('[data-cy="signup"]')
    .should('contain', "Sign Up")
    })


it("changes from signup to login when the user is on the sign in page", () => {
        cy.mount(
                    <Router>
                        <Navbar location={location}/>
                    </Router>
                );
        cy.clearLocalStorage("token")
        cy.get('[data-cy="logo"]')
        .should('contain', "Acebook")
        cy.get('[data-cy="login"]')
        .should('contain', "Log In")
    })


    it("allows the user to access the feed page when the user is logged in and clicks the Acebook logo", () => {
        cy.mount(
                    <Router>
                        <Navbar/>
                    </Router>
                );
        window.localStorage.setItem("token", "fakeToken")
        cy.get('[data-cy="logo"]').click()
        cy.url().should('include', '/feed') 
     })

     it("renders the Acebook title and the profile and signout links when the user is logged in and on a feed or posts page", () => {
        cy.mount(
                    <Router>
                        <Navbar location={location}/>
                    </Router>
                );
        window.localStorage.setItem("token", "fakeToken")
        
        cy.get('[data-cy="logo"]')
        cy.get('[data-cy="user"]')
        cy.get('[data-cy="signout"]')
        .should('contain', "Signout")        
     })
})
