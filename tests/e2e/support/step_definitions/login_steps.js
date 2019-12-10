given(`user with username {string} doesn't exists`, (u) => {
    console.log(u)
})
when('I open login page', () => {
    cy.visit('http://localhost:8080/login')
})
and('I click logout', () => {
    cy.get('a.logoutBtn').click({ force: true })
})
and('I enter username {string} and password {string}', (u,p) => {
    cy.get('input[name="username"]').type(u)
    cy.get('input[name="password"]').type(p)
})
then('I see a success message', () => {
    cy.contains('Logged in successfully')
})
then('I see a error message', () => {
    cy.contains('Login failed')
})