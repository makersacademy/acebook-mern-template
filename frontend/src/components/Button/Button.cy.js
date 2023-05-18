import Button from './Button';

describe('Button component', () => {
  it('renders button with text', () => {
    cy.mount(<Button text="Click me" />);
    cy.get('button').should('have.text', 'Click me');
  });

  it('renders button with color', () => {
    cy.mount(<Button color="#f99e92" />);
    cy.get('button').should('have.css', 'background-color', 'rgb(249, 158, 146)');
  });

  it('renders button with margin', () => {
    cy.mount(<Button margin="15px" />);
    cy.get('button').should('have.css', 'margin-bottom', '15px');
  });

  it('renders button with onClick', () => {
    const onClick = cy.stub().as('onClick'); // Assigning an alias to the stub
    cy.mount(<Button onClick={onClick} />);
    cy.get('button').click();
    cy.get('@onClick').should('be.called'); // Using the alias to check if the stub is called
  });
});




