import Post from "./Post";
import React from 'react';


describe("Post", () => {
  
    it("renders a post with a message", () => {
      cy.mount(<Post post={{ _id: 1, message: "Hello, world" }} />);
      cy.get('.left-aligned').should("contain.text", "Hello, world");
    });
  });


describe('Post component', () => {
  it('increments the number of likes when the like button is clicked', () => {
    cy.mount(<Post post={{ _id: '123', message: 'Test post', likes: 0 }} setPosts={() => {}} posts={[{ _id: '123', message: 'Test post', likes: 0 }]} token="12345" />);
    cy.get('button').contains('Like').click();
    cy.get('.likes-text').contains('Likes: 1');
  });
});



