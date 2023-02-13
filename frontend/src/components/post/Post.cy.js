import Post from './Post';
const setReload = () => {};

describe('Post', () => {
  it('renders a post with a message', () => {
    cy.mount(<Post post={{ _id: 1, message: 'Hello, world', likes: [] }} />);
    cy.get('[data-cy="post"]').should('contain.text', 'Hello, world');
  });

  describe('like button', () => {
    it('Calls the /like endpoint', () => {
      window.localStorage.setItem('token', 'fakeToken');
      window.localStorage.setItem('user_id', 'fakeId');

      cy.intercept({
        method: 'PATCH',
        url: '/posts/like',
      }).as('patchLike');

      cy.intercept({
        method: 'PATCH',
        url: '/posts/unlike',
      }).as('patchUnlike');

      cy.mount(
        <Post
          post={{ _id: 1, message: 'Hello, world', likes: [] }}
          setReload={setReload}
        />
      );

      cy.get('[data-cy=like-button]').should('exist');
      cy.get('[data-cy=like-button]').should('contain', 'Like');
      cy.get('[data-cy=like-button]').click();
      cy.wait('@patchLike');
      cy.get('[data-cy=like-button]').should('contain', 'Unlike');
      cy.get('[data-cy=like-button]').click();
      cy.wait('@patchUnlike');
      cy.get('[data-cy=like-button]').should('contain', 'Like');
    });
  });
});
