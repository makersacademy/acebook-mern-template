import Home from './Home';
import { BrowserRouter } from 'react-router-dom'; 

describe('Home', () => {
  it('renders a welcome message', () => {
    cy.mount(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    cy.contains(/welcome to acebook/i);
  });
});

// Wrapped 'Home" component with BrowserRouter which provides a routing context to the component
// This allows the Link components inside Home to work correctly in the test environment