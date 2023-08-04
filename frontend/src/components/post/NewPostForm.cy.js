import NewPostForm from "./NewPostForm";
const navigate = () => {};

describe("Creating a new Post", () => {
    it("calls the /newPost endpoint", () => {
        window.localStorage.setItem("token", "fakeToken")
        cy.mount(<NewPostForm navigate={navigate}/>)
        cy.intercept('POST', '/posts', {message: "OK", token: "faketoken"}).as("newPostRequest")

        cy.get("#message").type("this is a new message");
        cy.get("#submit").click();
        cy.wait('@newPostRequest').then( interception => {
            cy.log(interception.response.body)
            expect(interception.response.body.message).to.eq("OK")
        })
    })
})
