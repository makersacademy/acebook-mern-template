import CreateCommentForm from './CreateCommentForm';
const navigate = () => {};
const setReload = () => {};

describe('createCommentForm', () => {
  it('calls the /comment endpoint', () => {
    window.localStorage.setItem('token', 'fakeToken');
    window.localStorage.setItem('user_id', 'fakeId');

    cy.intercept(
      {
        method: 'POST',
        url: '/comments',
      },
      (req) => {
        expect(req.body.message).equal('test comment');
      }
    ).as('postComment');

    cy.mount(
      <CreateCommentForm
        navigate={navigate}
        token={'fakeToken'}
        setReload={setReload}
        id={'user_id'}
        post_id='787787kjjkljlk'
      ></CreateCommentForm>
    );

    cy.get('[data-cy="comment-input"]').type('test comment');
    cy.get('[data-cy="comment-submit"]').click();
    cy.wait('@postComment');
  });
});
