import PostForm from "./PostForm"


describe('PostForm', () => {
    it('adds a new post', () => {
      cy.mount(<PostForm />);
      cy.url().then((url) => {
        console.log('URL:', url);
      });
  
      cy.get('input[id="post"]').type('lala');
      cy.get('button[type="submit"]').click();
      cy.get('div').should('include', 'post was created');
    });
});