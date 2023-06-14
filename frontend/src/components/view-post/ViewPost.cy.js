// import React from "react";
// import { render, screen } from "@testing-library/react";
import ViewPost from "./ViewPost";
import { MemoryRouter } from 'react-router'
const navigate = () => {}

describe('ViewPost', () => {
  it('renders loading state', () => {
    cy.mount(
      <MemoryRouter>
        <ViewPost navigate={navigate}/>
      </MemoryRouter>
    );

    // expect(screen.getByText('Loading...')).toBeInTheDocument();
    cy.get("h2").should('contain.text', "View Post: ");
    cy.get("p").should('contain.text', "Message: ");
  });
});