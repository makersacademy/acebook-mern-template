import Post from './Post'

describe("Post", () => {
  it('renders a post with a message', () => {
    cy.mount(<Post post={{_id: 1, content: "This is my first post"}} />);
    cy.get('[data-cy="post-content"]').should('contain.text', "This is my first post")
  })
})

describe("Post", () => {
  it('renders a post with author', () => {
    cy.mount(<Post post={{_id: 1, content: "This is my first post"}} />);
    cy.get('[data-cy="post-content"]').should('contain.text', "This is my first post")
  })
})

describe("Post", () => {
  it('renders a post with date', () => {
    cy.mount(<Post post={{_id: 1, created_at: "13-10-23"}} />);
    cy.get('[data-cy="post-date"]').should('contain.text', "13-10-23")
  })
})

describe("Post", () => {
  it('renders a post with likes', () => {
    cy.mount(<Post post={{_id: 1, number_of_likes: 20}} />);
    cy.get('[data-cy="post-likes"]').should('contain.text', 20)
  })
})
