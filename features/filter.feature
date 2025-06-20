Feature: Product Filtering

  Scenario: Filter products by Name (A to Z)
    Given I am logged in as a standard user
    When I select "A to Z" from the sort dropdown
    Then the products should be sorted by name from A to Z

  Scenario: Filter products by Name (Z to A)
    Given I am logged in as a standard user
    When I select "Z to A" from the sort dropdown
    Then the products should be sorted by name from Z to A

  Scenario: Filter products by Price (Low to High)
    Given I am logged in as a standard user
    When I select "Low to High" from the sort dropdown
    Then the products should be sorted by price from low to high

  Scenario: Filter products by Price (High to Low)
    Given I am logged in as a standard user
    When I select "High to Low" from the sort dropdown
    Then the products should be sorted by price from high to low
