import Feed from './Feed'
import { mount } from 'cypress/react'
import React from 'react'
const navigate = () => {}

describe("Feed", () => {
  it("Calls the /posts endpoint and lists all the posts", () => {
    window.localStorage.setItem("token", "fakeToken")
    
    cy.intercept('GET', '/posts', (req) => {
        req.reply({
          statusCode: 200,
          body: { posts: [
            {_id: 1, message: "Hello, world"},
            {_id: 2, message: "Hello again, world"}
          ] }
        })
      }
    ).as("getPosts")

    cy.mount(<Feed navigate={navigate}/>)
    
    cy.wait("@getPosts").then(() =>{
      cy.get('[data-cy="post"]')
      .should('contain.text', "Hello, world")
      .and('contain.text', "Hello again, world")
    })
  })

  it("should create a new post", () => {
    window.localStorage.setItem("token", "fakeToken")
    cy.intercept('POST', '/posts', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          post: {
            _id: 1,
            message: "This is a test post"
          },
        }
      });
    }).as('newPostCreation');

    cy.mount(<Feed navigate={navigate}/>)

    cy.get('form').within(() => {
      cy.get('input[type="text"]').type("This is a test post");
      cy.get('button[type="submit"]').click();
    })

    cy.wait('@newPostCreation').then((interception) => {
      expect(interception.request.body).to.deep.equal({
        message: 'This is a test post',
      });
    });

    cy.get('#feed').should('contain', 'This is a test post');
  });

  // This test currently fails with the following error: 
  // CypressError: `cy.wait()` could not find a registered 
  // alias for: `@newPostCreation`. You have not aliased anything yet.

  xit("should create a new post", () => {
    cy.mount(<Feed navigate={navigate}/>)
    window.localStorage.setItem("token", "fakeToken")

    cy.intercept('POST', 'http://localhost:3000/posts', (req) => {
      req.reply((res) => {
        res.send({post: {
          _id: 1,
          message: "This is a test post"
        },
        })
      })
    })
    cy.get('input[type="text"]').type("This is a test post");
    cy.get('button[type="submit"]').click();
    cy.get('[data-cy="post"]').should('contain.text', "This is a test post")
})
});

// The above test was my alternative to the other 'should create
// a new post' that Sameera wrote; I have skipped it because running
// it causes both tests to fail.