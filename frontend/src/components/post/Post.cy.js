import Post from './Post'

describe("Post", () => {
  it('renders a post with a message', () => {
    cy.mount(<Post post={{_id: 1, message: "Hello, world",
    user: {
        "_id": "64d10621593ed5d2b1a88b36",
        "email": "test123@test",
        "username": "testname",
        "password": "pass",
        "__v": 0
    },}} />);
    cy.get('[data-cy="post"]').should('contain.text', "Hello, world")
  })

  it('renders the newest posts first', () => {
    cy.mount(<Post post={{_id: 1, message: "Hello, world",
    user: {
      "_id": "64d10621593ed5d2b1a88b36",
      "email": "test123@test",
      "username": "testname",
      "password": "pass",
      "__v": 0
  }}} />);
    cy.mount(<Post post={{_id: 2, message: "Another hello, world",
    user: {
      "_id": "64d10621593ed5d2b1a88b36",
      "email": "test123@test",
      "username": "testname",
      "password": "pass",
      "__v": 0
  }}} />);
    cy.get('[data-cy="post"]').should('contain.text', "Another hello, world")
  })

  it('renders a username with with post message', () => {
    cy.mount(<Post post={{_id: 1, message: "Hello, world",
    user: {
      "_id": "64d10621593ed5d2b1a88b36",
      "email": "test123@test",
      "username": "testname",
      "password": "pass",
      "__v": 0
  }}} />);
    cy.get('[data-cy="post"]').should('contain.text', "testname")
  })

})
