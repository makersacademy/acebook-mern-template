import Post from '../post/Post';
import React from 'react';

describe('Like component', () => {
  it('shows like button', () => {
    cy.mount(<Post post={{_id: 1, message: "Hello, world"}} />);
    cy.get('button').click(); // select the like button and click it

    cy.get('button').should('have.text', 'LIKE'); // assert that the button now shows the updated like count
  });

  it('shows like button', () => {
    const fakePost = {_id: 1, message: "Hello, world", likeCount: 5};
    const fakePostUpdated = {_id: 1, message: "Hello, world", likeCount: 6};
    cy.mount(<Post post={fakePost} />);
    cy.intercept('PATCH', '/posts/1', { message: "OK", post: fakePostUpdated}).as("UpdateLikeCount")
    cy.get('button').click(); // select the like button and click it

    cy.wait('@UpdateLikeCount').then( interception => {
      expect(interception.response.body.message).to.eq("OK")
      expect(interception.response.body.post.likeCount).to.eq(6)
    })
  });

});
