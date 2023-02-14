import React, { useEffect, useState } from 'react';
import Post from '../post/Post';
import Profile from './Profile';

describe('Profile', () => {
  it('call the /account endpoint and lists the users post', () => {
    window.localStorage.setItem('token', 'fakeToken');

    cy.intercept('GET', '/account', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          posts: [
            {
              _id: 1,
              message: 'Hello, world',
              likes: [],
              createdAt: '2023-02-14T11:44:40.970Z',
            },
            {
              _id: 2,
              message: 'Hello again, world',
              likes: [],
              createdAt: '2023-02-14T11:44:40.970Z',
            },
          ],
        },
      });
    }).as('getPosts');

    cy.mount(<Profile navigate={() => {}} />);

    cy.wait('@getPosts').then(() => {
      cy.get('[data-cy="post"]')
        .should('contain.text', 'Hello, world')
        .and('contain.text', 'Hello again, world');
    });
  });
});
