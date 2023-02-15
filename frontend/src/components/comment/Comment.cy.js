import Comment from './Comment';

describe('Comment', () => {
    it('renders a comment with a message', () => {
        cy.mount(
            <Comment
            data={{
                user_id: 1,
                post_id: 1,
                message: 'Hello world',
            }}
            />
        );
        cy.get('[data-cy="comment"]').should('contain.text', 'Hello world');
    });
})
