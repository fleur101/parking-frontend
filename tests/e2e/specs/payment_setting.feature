Feature: Payment Setting for user
    As a customer
    Such that I want to change monthly payment setting

    Scenario: Toggle Monthly Payment Setting (success)
        Given User is logged in
        When I open user profile page
        And I Click mothly payment toggle switch
        Then I see a success message for switch