describe('Home page', () => {

  before(() => {
    cy.visit('/');
    cy.get('[data-testid=varieties-grid]', { timeout: 10000 }).should('be.visible');
  })
  
  it('should display heading', () => {
    cy.get('[data-testid=heading]').should('have.text','Crypto Candy')
  });

  it('should display sub-heading', () => {
    cy.get('[data-testid=sub-heading]').should('have.text','Collect and trade crypto candy on Flow blockchain')
  });

  it('should render candy varieties', () => {
    cy.get('[data-testid=candy-card]').should('have.length', 9);
  })

  it('should render link to home page', () => {
    cy.contains('a', 'Home').should('be.visible');
  })

  it('should render link to collection page', () => {
    cy.contains('a', 'Collection').should('be.visible');
  })

  it('should render login button', () => {
    cy.contains('button', 'Log in').should('be.visible');
  })

  it('should display wallet provider when login button is clicked', () => {
    cy.contains('button', 'Log in').click();
    cy.get('iframe').should('be.visible');
  })
});


