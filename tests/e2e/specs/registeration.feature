Feature: Registration in the system
    As a customer
    Such that I don't have access to the system
    I want to create account in the system

    Scenario: Register in the system (success)
        When I open registration page
        And I enter email "fred@test.com", username "fred", name "Fred" and password "password123"
        And I submit the form
        Then I see a confirmation message

    Scenario: Register in the system with short (less than 6 characters) password (failure)
        When I open registration page
        And I enter email "fred1@test.com", username "fred1", name "Fred" and password "short"
        And I submit the form
        Then I see a rejection message

    Scenario: Register with existing username (failure)
        Given user with username "fred" exists
        When I open registration page
        And I enter email "fred@test.com", username "fred", name "Fred" and password "short"
        And I submit the form
        Then I see a rejection message