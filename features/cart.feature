Feature: Add Product to Cart

  # --- Positive Scenarios ---
  Scenario: Add first product to cart and verify cart badge
    Given I am logged in as a standard user
    When I add the first product to the cart
    Then the cart badge should show 1

  Scenario: View cart and verify product is in the cart
    Given I am logged in as a standard user
    And I have added the first product to the cart
    When I open the cart page
    Then the product should be visible in the cart

  # --- Negative Scenarios ---
  Scenario: Cart badge remains zero when no product is added
    Given I am logged in as a standard user
    When I do not add any product to the cart
    Then the cart badge should not be visible or should show 0

  Scenario: Cart is empty when no product is added
    Given I am logged in as a standard user
    When I open the cart page without adding any product
    Then the cart should display no products

  Scenario: Remove product from cart makes cart empty
    Given I am logged in as a standard user
    And I have added the first product to the cart
    When I remove the product from the cart
    Then the cart should display no products
    And the cart badge should not be visible or should show 0
