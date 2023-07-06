import CreatePost from './CreatePost'
//const navigate = () => {}

describe("Create a post", () => {
    it("calls the /posts endpoint", () => {
        cy.mount(<CreatePost/>)

        cy.intercept('POST', '/posts', { message: "OK" }).as("CreatePost")
        cy.get("#message").type("somestring"); // check this code of line. 
        cy.get("#submit").click();
        cy.wait('@CreatePost').then( interception => {
            expect(interception.response.body.message).to.eq("OK")
        });
    });

});
