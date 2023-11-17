import React from 'react'; // NOT REQUIRED
import NewPost from './NewPost';

describe('NewPost', () => {
    it('renders a new post with text and image', () => {
        const postText = 'Hello, world!';
        const postImg = 'https://example.com/image.jpg';
        const postAlt = "image alt text"
        //assertions
        cy.mount(<NewPost post_text={postText} post_img={postImg} post_alt={postAlt} />);
        cy.get('.new_post img').should('have.attr', 'src', postImg);
        cy.get('.new_post img').should('have.attr', 'alt', postAlt);
    });
});


// describe("New Post", () => {
    //     it('renders a new post with a message', () => {
    //         cy.mount(<NewPost post_text={"post message"} post_img="#"/>);
    //         cy.get('[data-cy="new_post"]').should('contain.text', "post message")
    //     })
    // })
    