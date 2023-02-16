/* eslint-disable no-undef */
import Feed from './Feed';
const navigate = () => {};
const setReload = () => {};

describe('Feed', () => {
  it('Calls the /posts endpoint and lists all the posts', () => {
    window.localStorage.setItem('token', 'fakeToken');

    cy.intercept('GET', '/posts', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          posts: [
            {
              _id: 1,
              message: 'Hello, world',
              likes: [],
              createdAt: '2023-02-14T11:44:40.970Z',
              user_id: {
                _id: '63ee52ddb6e29209de11f059',
              },
            },

            {
              _id: 2,
              message: 'Hello again, world',
              likes: [],
              createdAt: '2023-02-14T11:44:40.970Z',
              user_id: {
                _id: '63ee52ddb6e29209de11f059',
              },
            },
          ],
        },
      });
    }).as('getPosts');

    cy.mount(<Feed navigate={navigate} setReload={setReload} />);

    cy.wait('@getPosts').then(() => {
      cy.get('[data-cy="post"]')
        .should('contain.text', 'Hello, world')
        .and('contain.text', 'Hello again, world');
    });
  });

  it('If posts have comments then comments are displayed', () => {
    window.localStorage.setItem('token', 'fakeToken');

    cy.intercept('GET', '/posts', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          posts: [
            {
              _id: 1,
              message: 'Hello, world',
              likes: [],
              createdAt: '2023-02-14T11:44:40.970Z',
              comments: [
                {
                  message: 'another message',
                  user_id: 1,
                  post_id: 1,
                  likes: [],
                },
              ],
              user_id: { _id: '1' },
            },
            {
              _id: 2,
              message: 'Hello again, world',
              likes: [],
              createdAt: '2023-02-14T11:44:40.970Z',
              comments: [
                {
                  message: 'another hello world',
                  user_id: 2,
                  post_id: 1,
                  likes: [],
                },
              ],
              user_id: { _id: '1' },
            },
          ],
        },
      });
    }).as('getPosts');

    cy.mount(<Feed navigate={navigate} setReload={setReload} />);

    cy.wait('@getPosts').then(() => {
      cy.get('[data-cy="comment"]')
        .should('contain.text', 'another message')
        .and('contain.text', 'another hello world');
    });
  });
});
