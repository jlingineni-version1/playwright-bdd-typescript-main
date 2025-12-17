Feature: Connectivity Tool Map Navigation

Background: Filter map functionality test
Given I am on the home page & I navigate to the connectivity tool map

  @filrermap
  Scenario: Filter map test to validate expected results for local authority , destination and mode of transport filters
    When I apply filters on the map & select local authority view "Birmingham" & select Score by destination "Leisure" & Score by mode of transport "Cycling"
    Then I should see expected results based on the applied filters

  @connectivityscore
  Scenario: Verify connectivity score on map view for local authority "Birmingham"
    When I select local authority view "Birmingham" & select tile on the map
    Then I should see the connectivity score displayed correctly on the map

  @localauthorityband
  Scenario: Verify local authority band displayed on the map for local authority "Birmingham"
    When I select local authority view "Birmingham" & enable show authority band checkbox
    Then I should see the authority bands displayed correctly on the map

  @filtermap
  Scenario Outline: Verify map filtering options for authority destination & mode of transport
    When I select localauthorityview as "<authority>" & select Scorebydestination as "<destination>" & Scorebymodeoftransport as "<mode>"
    Then I should see the map updated with all selected filtering options "<authority>", "<destination>", "<mode>"
    Examples:
      | authority           | destination | mode             |
      | Birmingham          | Leisure     | Cycling          |
      | Manchester          | Workplaces  | Driving          |
      | Leeds               | Education   | Walking          |
      | Liverpool           | Health      | Public transport |
      | Newcastle upon Tyne | Shopping    | Cycling          |
      | Sheffield           | Residential | Driving          |


  @filtermap
  Scenario Outline: Verify Score and Band on map for different filtering options
    When I select local authority view "<authority>" & select Score by destination "<destination>" & Score by mode of transport "<mode>"
    Then I should see the map updated with the selected filtering options "<authority>", "<destination>", "<mode>","<expectedScore>","<expectedBand>"
    Examples:
      | authority  | destination | mode            | expectedScore | expectedBand |
      | Birmingham | Leisure     | Cycling         | 85            | [B]          |
      | Manchester | Workplaces  | Driving         | 87            | [J]          |
      | Leeds      | Education   | Walking         | 69            | [A]          |
      | Liverpool  | Health      | Public transport| 75            | [F]          |
# | Newcastle upon Tyne        | Shopping       | Cycling   |
# | Sheffield                  | Residential    | Driving   |

  @filtermap
  Scenario Outline: Verify Score on map for different local authorities
    When I search for location "<location>" and select coordinates <x>,<y> on the map & select tile on the map
    Then I should see the connectivity score displayed correctly on the map for "<location>" as "<expectedScore>"
    Examples:
      | location                                         | expectedScore |x   | y    | 
      | Hounslow West, London Borough of Hounslow        | 86            |476 | 275  |
      | Leeds, England, United Kingdom                   | 87            |301 | 278  |

