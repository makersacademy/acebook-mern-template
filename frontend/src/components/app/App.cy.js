import App from './App';
import { BrowserRouter } from 'react-router-dom'; 

describe('App', () => {
  it('renders a welcome message', () => {
    cy.mount(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    cy.contains(/welcome to acebook/i);
  });
});