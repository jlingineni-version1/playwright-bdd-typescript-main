Feature: Current Selection

  Background: Current selection functionality test
    Given I am on the home page & I navigate to the connectivity tool map

  @currentselection @regression
  Scenario Outline: Verify current selection results displayed accordingly when Score for different local authorities are selected
    When I search for location "<location>" and select coordinates <x>,<y> on the map & select tile on the map
    Then current selection should display expected results <cs_latitude>,<cs_longitude>,"<location>","<squareID>"
    Examples:
      | location | expectedScore | x   | y   | squareID      | cs_latitude | cs_longitude |
      | Hounslow | 86            | 476 | 275 | 512250_176050 | 51.472289   | -0.385232    |

  @currentselection @regression
  Scenario: Verify current selection updates when cancel location selection is selected
    When I search for location "<location>" and select coordinates <x>,<y> on the map & select tile on the map
    Then I cancel the location selection and current selection should update to reflect new tile selection
    Examples:
      | location | expectedScore | x   | y   | squareID      | cs_latitude | cs_longitude |
      | Hounslow | 86            | 476 | 275 | 512250_176050 | 51.472289   | -0.385232    |

  @currentselection @regression
  Scenario: Verify explore the score link displays expected results
    When I search for location "<location>" and select coordinates <x>,<y> on the map & select tile on the map
    Then I click on Explore the score link should display expected results <cs_latitude>,<cs_longitude>,"<location>","<squareID>"
    Examples:
      | location | expectedScore | x   | y   | squareID      | cs_latitude | cs_longitude |
      | Hounslow | 86            | 476 | 275 | 512250_176050 | 51.472289   | -0.385232    |




