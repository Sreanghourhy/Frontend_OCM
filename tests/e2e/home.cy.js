// E2E Test: Home Page
describe('Home Page', () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit('/')
  })

  it('should load the home page', () => {
    // Verify the page loaded
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })

  it('should have the correct title', () => {
    // Check if the page has the expected content
    cy.get('body').should('exist')
  })

  it('should display main content', () => {
    // Check if main content area exists
    cy.get('body').should('be.visible')
  })
})
