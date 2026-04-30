// Cypress Custom Commands
// https://on.cypress.io/custom-commands

// Example: Login command
// Cypress.Commands.add('login', (email, password) => { ... })

// Example: Get by data-testid
Cypress.Commands.add('getByTestId', (testId) => {
  return cy.get(`[data-testid="${testId}"]`)
})
