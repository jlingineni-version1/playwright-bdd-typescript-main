Feature: Home Page Login Functionality
  @home @smoke
  Scenario:Successful navigation to Connectivity Tool map
    Given I am on the home page
    When I click the explore connectivity tool link
    Then I should navigate to map successfully

  @accessibility_footerLink @footer @smoke @regression
  Scenario:Home page accessibility check
    Given I am on the home page
    When I click the on accessibility check and validate the accessibility statement page is displayed successfully
    Then navigate back to home page

  @privacypolicy_footerLink @footer @smoke @regression
  Scenario:Home page privacy policy check
    Given I am on the home page
    When I click on privacy policy link and validate the privacy policy page is displayed successfully
    Then navigate back to home page

  @guidance_footerLink @footer @smoke @regression
  Scenario:Home page guidance link check
    Given I am on the home page
    When I click on guidance link and validate the guidance page is displayed successfully
    Then navigate back to home page 

  @understandData_footerLink @footer @smoke @regression
  Scenario:Home page understand the data link check
    Given I am on the home page
    When I click on understand the data link and validate the understand the data page is displayed successfully
    Then navigate back to home page

    @feedbacKLink @footer @smoke @regression
  Scenario:Home page feedback link check
    Given I am on the home page
    When I click on feedback link and validate the feedback page is submitted successfully
    Then navigate back to home page


    





