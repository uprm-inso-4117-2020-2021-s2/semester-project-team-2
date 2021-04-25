Feature: Registration
  """
   Registration feature will test for successful redirects to registration pages.
  """

  Scenario: Successful redirect to tutor registration
    Given I visit the login page
    When I click the tutor registration link
    Then I am at the tutor registration page

  Scenario: Successful redirect to student registration
    Given I visit the login page
    When I click the student registration link
    Then I am at the student registration page
