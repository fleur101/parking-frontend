given('User is logged in', () => {
    cy.visit('http://localhost:8080/login')
    cy.get('input[name="username"]').type('fred')
    cy.get('input[name="password"]').type('password123')
    cy.get('button[type="submit"]').click()
    cy.wait(2000)
})
when('I open user profile page', () => {
    cy.visit('http://localhost:8080/profile')
})
and('I Click mothly payment toggle switch', () => {
    cy.get('input[type="checkbox"]').click({ force: true })
})
then('I see a success message for switch', () => {
    cy.contains('Monthly payment setting changed successfully')
})