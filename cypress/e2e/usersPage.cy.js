describe('Users Page Tests', () => {
  it('should visit', () => {
    cy.visit('/');
    cy.url().should('include', '/users')

    cy.get('.loading').should('be.visible');

    cy.get('.logo').should('be.visible');
  });

  it('should have an export csv button', () => {
    cy.get('[data-cy=export-csv]').contains('Export Csv File');
    cy.get('[data-cy=export-csv]').click()
  });

  it('should have filter by gender dropdown', () => {
    cy.get('body').click();
    cy.get('[data-cy=filter-by-gender');
    cy.get('[data-cy=filter-by-gender').click().get('mat-option').should('have.length', 2);
    cy.get('body').click()
  });

  it('should have filter by nationality dropdown', () => {
    cy.get('[data-cy=filter-by-nationality]');
    cy.get('[data-cy=filter-by-nationality]').click().get('mat-option').should('have.length', 16);
    cy.get('body').click()
  });

  it('should have select table column dropdown', () => {
    cy.get('[data-cy=select-table-column]');
    cy.get('[data-cy=select-table-column]').click().get('mat-option').should('have.length', 8)
    cy.get('body').click()
  });


  it('should have users table', () => {
    cy.get('[data-cy=users-table]')
    .should('be.visible');
  });

  it('should call the random user api', () => {
    cy.server();
    cy.route('GET', 'https://randomuser.me/api?results=100&page=1', []).as('getUsers');
  });

  it('should scroll the table', () => {
    cy.get('[data-cy=users-table]').scrollTo('bottom');
    // cy.get('.loading').should('be.visible');

    cy.get('[data-cy=users-table]').scrollTo('bottom');
    cy.get('.loading').should('be.visible');

  });

  it('Mobile view tests', () => {

    cy.visit('/');
    cy.viewport('samsung-note9');
    cy.get('.logo').should('be.visible');

    cy.get('[data-cy=export-csv]').contains('Export Csv File').should('be.visible');

    cy.get('[data-cy=filter-by-gender').should('be.visible');

    cy.get('[data-cy=filter-by-nationality]').should('be.visible');

    cy.get('[data-cy=select-table-column]').should('be.visible');

    cy.get('[data-cy=users-table]').should('be.visible');

    cy.get('.menu-icon').should('be.visible');
    cy.get('.menu-icon').click();

    cy.get('.close-icon').should('be.visible');
    cy.get('.avatar').should('be.visible');
    cy.get('.name').should('be.visible');
    cy.get('.menu-button').should('be.visible');

    cy.get('.close-icon').click();

    cy.get('.menu-icon').should('be.visible');
  });
})
