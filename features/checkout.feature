Feature: Product Checkout

  # --- Positive Scenario ---
  Scenario: Successful checkout with single product
    Given I am logged in as a standard user
    And I have added the first product to the cart
    When I proceed to checkout
    And I enter valid checkout information
    And I complete the purchase
    Then I should see a confirmation that my order was placed

  # --- Negative Scenarios ---
  Scenario: Checkout with empty information fails
    Given I am logged in as a standard user
    And I have added the first product to the cart
    When I proceed to checkout
    And I leave all checkout fields empty
    And I try to continue
    Then I should see an error that information is required

  Scenario: Checkout with empty cart still shows info page (by SauceDemo design)
    Given I am logged in as a standard user
    When I open the cart page
    And I click the checkout button
    Then I should see the checkout information form

  Scenario: Checkout with empty first name fails
    Given I am logged in as a standard user
    And I have added the first product to the cart
    When I proceed to checkout
    And I leave the first name empty
    And I enter "User" as last name and "12345" as postal code
    And I try to continue
    Then I should see an error for missing first name

  Scenario: Checkout with empty last name fails
    Given I am logged in as a standard user
    And I have added the first product to the cart
    When I proceed to checkout
    And I enter "Test" as first name and leave the last name empty
    And I enter "12345" as postal code
    And I try to continue
    Then I should see an error for missing last name

  Scenario: Checkout with empty postal code fails
    Given I am logged in as a standard user
    And I have added the first product to the cart
    When I proceed to checkout
    And I enter "Test" as first name and "User" as last name
    And I leave the postal code empty
    And I try to continue
    Then I should see an error for missing postal code
