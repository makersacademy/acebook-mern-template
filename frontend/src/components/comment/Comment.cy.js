/* eslint-disable no-undef */
import Comment from './Comment';
const setReload = () => {};

describe('Comment', () => {
  it('renders a comment with a message', () => {
    cy.mount(
      <Comment
        comment={{
          user_id: 1,
          post_id: 1,
          message: 'Hello world',
          likes: [],
        }}
        setReload={setReload}
      />
    );
    cy.get('[data-cy="comment"]').should('contain.text', 'Hello world');
  });

  describe('like button', () => {
    it('should allow the user to like a comment', () => {
      window.localStorage.setItem('token', 'fakeToken');
      window.localStorage.setItem('user_id', 'fakeId');

      cy.intercept({
        method: 'PATCH',
        url: '/comments/like',
      }).as('patchLikeComment');

      cy.mount(
        <Comment
          comment={{
            _id: 1,
            message: 'Hello, world',
            likes: [],
            createdAt: '2023-02-14T11:44:40.970Z',
          }}
          setReload={setReload}
        />
      );

      cy.get('[data-cy=like-button]').should('exist');
      cy.get('[data-cy=like-button] img').should(
        'have.attr',
        'src',
        '/images/thumbOutline.png'
      );

      cy.get('[data-cy=like-button]').click();
      cy.wait('@patchLikeComment');
      cy.get('[data-cy=like-button] img').should(
        'have.attr',
        'src',
        '/images/thumbFilled.png'
      );
    });
  });
});
