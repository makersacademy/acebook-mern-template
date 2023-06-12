import { MemoryRouter } from 'react-router';
import Post from './Post'

describe("Post", () => {
  it('renders a post with a message', () => {
    cy.mount(
      <MemoryRouter>
        <Post post={{_id: 1, message: "Hello, world"}} />
      </MemoryRouter>
    );
    cy.get('[data-cy="post"]').should('contain.text', "Hello, world")
  })
})
