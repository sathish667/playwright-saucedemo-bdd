Feature: E2E Checkout Flow on SauceDemo

  Scenario: User purchases a product successfully
    Given User is on the SauceDemo login page
    When User logs in with username "standard_user" and password "secret_sauce"
    And User adds "Sauce Labs Backpack" to the cart
    And User proceeds through checkout with "Sathish", "C", and "641001"
    Then User should see the confirmation message "Thank you for your order!"