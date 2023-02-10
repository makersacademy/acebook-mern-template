import React from 'react';
import DeleteButtonPost from './DeleteButtonPost';

describe('DeleteButtonPost', () => {
  it('deletes the post and sets isDeleted to true', () => {
    const post = { _id: 123 };
    const setIsDeleted = cy.stub();

    cy.mount(<DeleteButtonPost post={post} setIsDeleted={setIsDeleted} />);

    cy.get('button').click();

   

    cy.wrap(setIsDeleted)
      .should('be.calledWith', true);
  });
});
