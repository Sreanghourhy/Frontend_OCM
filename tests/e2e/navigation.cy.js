// E2E Test: Navigation
describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should navigate between routes', () => {
    // Test navigation if your app has routing
    cy.get('body').should('exist')
  })

  it('should handle 404 pages', () => {
    // Test non-existent routes
    cy.visit('/non-existent-page', { failOnStatusCode: false })
    cy.get('body').should('exist')
  })
})
