import Navbar from "./Navbar";

const nav = () => {};

//Fix test
describe("Navbar functionality", () => {
    beforeEach(() => {
        cy.mount_plus(<Navbar navigate={nav} />, { routerProps: {
            initialEntries: ['/'],
         }})
    })
    it("Posts button", () => {

       
        cy.get("#posts").click().then(() => {console.log("clicked")});
        //cy.url().should('include', '/posts');
        

    });
    it("Signup button", () => {

    });

});