import Post from '../post/Post';
import React from 'react';

describe('Like component', () => {
  it('increments like count on click', () => {
    cy.mount(<Post post={{_id: 1, message: "Hello, world"}} />);
    cy.get('button').click(); // select the like button and click it

    cy.get('button').should('have.text', 'LIKE'); // assert that the button now shows the updated like count
  });
});
