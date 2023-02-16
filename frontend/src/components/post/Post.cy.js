/* eslint-disable no-undef */
import Post from './Post';
const setReload = () => {};

describe('Post', () => {
  it('renders a post with a message', () => {
    cy.mount(
      <Post
        post={{
          _id: 1,
          message: 'Hello, world',
          likes: [],
          createdAt: '2023-02-14T11:44:40.970Z',
        }}
      />
    );
    cy.get('[data-cy="post"]').should('contain.text', 'Hello, world');
  });

  it('If passed less than four comments as a prop, will display comments', () => {
    cy.mount(
      <Post
        post={{
          _id: 1,
          message: 'Hello world again',
          likes: [],
          comments: [
            { message: 'another message', user_id: 1, post_id: 1, likes: [] },
            {
              message: 'another hello world',
              user_id: 2,
              post_id: 1,
              likes: [],
            },
          ],
          createdAt: '2023-02-14T11:44:40.970Z',
        }}
      />
    );
    cy.get('[data-cy="comment"]')
      .should('contain.text', 'another message')
      .and('contain.text', 'another hello world');
  });

  it('If passed four or more comments as a prop, will display the first three comments', () => {
    cy.mount(
      <Post
        post={{
          _id: 1,
          message: 'Hello world again',
          likes: [],
          comments: [
            { message: 'another message', user_id: 1, post_id: 1, likes: [] },
            {
              message: 'another hello world',
              user_id: 2,
              post_id: 1,
              likes: [],
            },
            { message: 'third message', user_id: 3, post_id: 1, likes: [] },
            {
              message: 'fourth message',
              user_id: 4,
              post_id: 1,
              likes: [],
            },
          ],
          createdAt: '2023-02-14T11:44:40.970Z',
        }}
      />
    );
    cy.get('[data-cy="comment"]')
      .should('contain.text', 'another message')
      .and('contain.text', 'another hello world')
      .and('contain.text', 'third message')
      .and('not.contain.text', 'fourth message');
  });

  describe('like button', () => {
    it('Calls the /like endpoint and toggles likes on and off', () => {
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
          post={{
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
      cy.wait('@patchLike');
      cy.get('[data-cy=like-button] img').should(
        'have.attr',
        'src',
        '/images/thumbFilled.png'
      );

      cy.get('[data-cy=like-button]').click();
      cy.wait('@patchUnlike');
      cy.get('[data-cy=like-button] img').should(
        'have.attr',
        'src',
        '/images/thumbOutline.png'
      );
    });
  });

  describe('delete button', () => {
    xit('displays delete buttons', () => {
      cy.mount(
        <Post
          post={{
            _id: 1,
            message: 'Hello, world',
            likes: [],
            createdAt: '2023-02-14T11:44:40.970Z',
          }}
        />
      );
      cy.get('[data-cy=delete-button]').should('exist');
    });

    xit('deletes post', () => {
      window.localStorage.setItem('token', 'fakeToken');
      window.localStorage.setItem('user_id', 'fakeId');
      cy.intercept({
        method: 'DELETE',
        url: '/posts',
      }).as('deletePost');
      cy.mount(
        <Post
          post={{
            _id: 1,
            message: 'Hello, world',
            likes: [],
            createdAt: '2023-02-14T11:44:40.970Z',
          }}
        />
      );
      cy.get('[data-cy=delete-button]').click();
      cy.wait('@deletePost');
      cy.get('[data-cy=delete-button]').should('not.exist');
    });
  });

  describe('edit button', () => {
    xit('displays edit button', () => {
      cy.mount(
        <Post
          post={{
            _id: 1,
            message: 'Hello, world',
            likes: [],
            createdAt: '2023-02-14T11:44:40.970Z',
          }}
        />
      );

      cy.get('[data-cy=edit-button]').should('exist');
    });

    xit('allows editing of post', () => {
      window.localStorage.setItem('token', 'fakeToken');
      window.localStorage.setItem('user_id', 'fakeId');
      cy.intercept({
        method: 'PUT',
        url: '/posts',
      }).as('putUpdate');
      cy.mount(
        <Post
          post={{
            _id: 1,
            message: 'Hello, world',
            likes: [],
            createdAt: '2023-02-14T11:44:40.970Z',
          }}
        />
      );

      cy.get('[data-cy=edit-button]').click();
      cy.get('#text-value').innerHTML = 'testing';
      cy.get('[data-cy=edit-submit]').click();
      cy.wait('@putUpdate');
      cy.get('#text-value').should('contain.text', 'Hello, world');
    });
  });
});
