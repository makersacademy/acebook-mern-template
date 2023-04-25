import Navbar from './Navbar';
import { BrowserRouter as Router, useLocation} from "react-router-dom";



const location = () => {}
describe("Navbar", () => {
  it("renders the Acebook title and a link to the login page", () => {
    cy.mount(
                <Router>
                    <Navbar/>
                </Router>
            );
    // window.localStorage.removeItem("token");
    cy.clearLocalStorage("token")
    cy.get('[data-cy="h1"]')
    .should('contain', "Acebook")
    cy.get('[data-cy="login"]')
    .should('contain', "Log In")
    .and('have.attr', 'href', '/login')
    })

    it("changes from login to sign up when the user is on the sign in page", () => {
        cy.mount(
                    <Router>
                        <Navbar location={location}/>
                    </Router>
                );
        cy.clearLocalStorage("token")
        cy.get('[data-cy="h1"]')
        .should('contain', "Acebook")
        cy.get('[data-cy="signup"]')
        .should('contain', "Sign Up")
        .and('have.attr', 'href', '/signup')
    })

    it("changes from login to sign up when the user is on the sign in page", () => {
        cy.mount(
                    <Router>
                        <Navbar location={location}/>
                    </Router>
                );
        cy.clearLocalStorage("token")
        cy.get('[data-cy="h1"]')
        .should('contain', "Acebook")
        cy.get('[data-cy="signup"]')
        .should('contain', "Sign Up")
        .and('have.attr', 'href', '/signup')
    })

    // it("it prevents the user from clicking on the Acebook title to access feed when they are not logged in", () => {
    //     cy.mount(
    //                 <Router>
    //                     <Navbar navigate={navigate}/>
    //                 </Router>
    //             );
    //     // window.localStorage.removeItem("token");
    //     cy.clearLocalStorage("token")
    //     cy.get('[data-cy="h1"]')
    //     .should('contain', "Acebook")
    //     cy.get('[data-cy="login"]')
    //     .should('contain', "Log In")
    //     .and('have.attr', 'href', '/login')
    //     })
})

// cy.get('#header a')
//   .should('have.class', 'active')
//   .and('have.attr', 'href', '/users')