import Navbar from './Navbar'

describe("Navbar", () => {
    it('displays the logo', () =>{
        cy.mount(<Navbar />);
        cy.get('[data-cy="navbar"]').should('contain.text', "Acebook")
  

    })
})