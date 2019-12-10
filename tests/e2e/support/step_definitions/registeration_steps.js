given('user with username {string} exists', (u) => {
    console.log(u)
})
when('I open registration page', () => {
    cy.visit('http://localhost:8080/signup')
})
and('I enter email {string}, username {string}, name {string} and password {string}', (e, u, n, p) => {
    cy.get('input[name="email"]').type(e)
    cy.get('input[name="name"]').type(n)
    cy.get('input[name="username"]').type(u)
    cy.get('input[name="password"]').type(p)
    cy.get('input[name="cpassword"]').type(p)
})
and('I submit the form', () => {
    cy.get('button[type="submit"]').click()
})
then('I see a confirmation message', () => {
    cy.contains('Registered and Login successfully')
})
then('I see a rejection message', () => {
    cy.contains('Registration failed')
})