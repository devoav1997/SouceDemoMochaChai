Feature: Login to SauceDemo

  Scenario: Valid login
    Given I open the SauceDemo login page
    When I enter valid credentials
    And I click the login button
    Then I should be redirected to the inventory page

  Scenario: Login with missing username
    Given I open the SauceDemo login page
    When I enter only the password
    And I click the login button
    Then I should see an error message "Username is required"

  Scenario: Login with missing password
    Given I open the SauceDemo login page
    When I enter only the username
    And I click the login button
    Then I should see an error message "Password is required"

  Scenario: Login with invalid credentials
    Given I open the SauceDemo login page
    When I enter invalid username and password
    And I click the login button
    Then I should see an error message "Username and password do not match"
