// import CreatePostForm from './CreatePostForm'
// const navigate = () => {}

describe("Creates a post.", () => {

  it("Redirects to '/posts' after creating post.", () => {
    cy.intercept("POST", "/posts", (req) => {
      req.reply((res) => {
        res.send({ success: true });
        res.redirect("/posts");
      });
    }).as("createpost");
    
    cy.visit("/signup");
    cy.signup("user@email.com", "12345678")
    cy.visit("/login");
    cy.get("#email").type("user@email.com");
    cy.get("#password").type("12345678");
    cy.get("#submit").click();
    cy.visit("/createpost");
    cy.get("#message").type("Hello World");
    cy.get("#submit").click();
  
    cy.wait("@createpost");
    cy.url().should("include", "/posts");
  });

    // it("Redirects to '/posts' after creating post.", () => {
    //     window.localStorage.setItem("token", "fakeToken")
        
    //     cy.intercept("POST", "/posts", (req) => {
    //       req.reply((res) => {
    //         res.send({ success: true });
    //         res.redirect("/posts");
    //       });
    //     }).as("createpost");
    
    //     cy.mount(<CreatePostForm navigate={navigate}/>)
        
    //     cy.wait("@createpost").then(() =>{
    //       cy.get('[data-cy="post"]')
    //       cy.url().should("include", "/posts");
    //     })
    //   })
  });