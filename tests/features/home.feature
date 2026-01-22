Feature: Home Page Login Functionality

  Background: Filter map functionality test
    Given I am on the home page

  @home @smoke
  Scenario:Successful navigation to Connectivity Tool map
    When I click the explore connectivity tool link
    Then I should navigate to map successfully

  @home @smoke @fullpagescreenshot
  Scenario:Test Full page screenshot of Connectivity Tool map
    When I click explore connectivity tool link and take connectivity full page screenshot
    Then I should successfully capture a full-page screenshot of the connectivity map

  @home @regression
  Scenario:Home page Open Government Licence
    When I click the on Open Government Licence check and validate the Open Government Licence page is displayed successfully
    Then navigate back to home page

  @footer @regression
  Scenario:Home page accessibility check
    When I click the on accessibility check and validate the accessibility statement page is displayed successfully
    Then navigate back to home page

  @footer @regression
  Scenario:Home page privacy policy check
    When I click on privacy policy link and validate the privacy policy page is displayed successfully
    Then navigate back to home page

  @footer @regression
  Scenario:Home page guidance link check
    When I click on guidance link and validate the guidance page is displayed successfully
    Then navigate back to home page

  @regression @footer
  Scenario:Home page nav header guidance link check
    When I click on nav header guidance link and validate the guidance page is displayed successfully
    Then navigate back to home page

  @footer @regression
  Scenario:Home page understand the data link check
    When I click on understand the data link and validate the understand the data page is displayed successfully
    Then navigate back to home page

# @feedbacKLink @regression
# Scenario:Home page feedback link check
#   When I click on feedback link and validate the feedback page is submitted successfully
#   Then navigate back to home page








