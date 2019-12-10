Feature: Login in the system
    As a customer
    Such that I don't have access to the system
    I want to access the system

    Scenario: Login in the system (success)
        When I open registration page
        And I enter email "fred4@test.com", username "fred4", name "Fred" and password "password123"
        And I submit the form
        And I click logout
        And I enter username "fred4" and password "password123"
        And I submit the form
        Then I see a success message

    Scenario: Login with wrong credentials (failure)
        Given user with username "random" doesn't exists
        When I open login page
        And I enter username "random" and password "randomstuff"
        And I submit the form
        Then I see a error message