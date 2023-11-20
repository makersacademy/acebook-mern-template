import NavBar from "./NavBar";
import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';

describe('NavBar Component', () => {
  beforeEach(() =>
  cy.mount(
    <Router>
      <NavBar />
    </Router>
  ));
  it('contains an h2 title with text "Acebook"', () => {
    cy.get('h2').should('have.text', 'Acebook');
  });
  it('homebutton click takes you to home', () => {
    cy.get('[data-cy="home-button"]').click();
    cy.url().should('include', '/posts');
  })
  it('profile button click takes you to profile', () => {
    cy.get('[data-cy="profile-button"]').click();
    cy.url().should('include', '/profile');
  })
  it('search button click takes you to search', () => {
    cy.get('[data-cy="search-button"]').click();
    cy.url().should('include', '/search');
  })
  it('search button click takes you to login', () => {
    cy.get('[data-cy="logout-button"]').click();
    cy.url().should('include', '/login');
  })

});

