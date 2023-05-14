import Home from './Home';
import { BrowserRouter } from 'react-router-dom';
// const navigate = () => {}

describe("Home", () => {
  it("Presents home page with links to signup and login pages", () => {

    cy.mount(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    
    cy.intercept('GET', '/', (req) => {
      req.reply({
        statusCode: 200,
        Body: { key: "value" }
        })
      })
    
      

      cy.get('a[href="/signup"]').should('exist')
      cy.get('a[href="/login"]').should('exist')

      })
})

