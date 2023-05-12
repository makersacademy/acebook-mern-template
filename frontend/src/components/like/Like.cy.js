import Post from '../post/Post';
import React from 'react';

describe('Like component', () => {
  it('shows like button', () => {
    cy.mount(<Post post={{_id: 1, message: "Hello, world"}} />);
    cy.get('button').click(); // select the like button and click it

    cy.get('button').should('have.text', 'LIKE'); // assert that the button now shows the updated like count
  });

  it('shows like button', () => {
    cy.mount(<Post post={{_id: 1, message: "Hello, world"}} />);
    cy.intercept('PATCH', '/post/1', { token: "fakeToken", message: "OK" }).as("UpdateLikeCount")
    cy.get('button').click(); // select the like button and click it

    cy.wait('@UpdateLikeCount').then( interception => {
      expect(interception.response.body.message).to.eq("OK")
    })
  });

});
