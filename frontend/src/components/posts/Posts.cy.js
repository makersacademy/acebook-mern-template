import React from 'react';
import Posts from './Posts';
const navigate = () => {};

describe('Posts', () => {
  it('Renders the CreatePostForm and Feed components', () => {
    window.localStorage.setItem('token', 'fakeToken');
    cy.mount(<Posts navigate={navigate} />);

    cy.get('.create-post-form').should('exist');
    cy.get('#feed').should('exist');
  });
});
