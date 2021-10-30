describe('Collection page', () => {

  before(() => {
    cy.visit('/collection');
  })
  
  it('should display text to login', () => {
    cy.contains('span', 'Please login to view your collection.').should('be.visible');
  });

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


