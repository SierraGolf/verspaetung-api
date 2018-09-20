Feature: Get lines for time and location


  Scenario: Validate that timestamp is a required parameter
    When the get lines endpoint is called with the following parameters
      | x | y |
      | 1 | 1 |
    Then the get lines response is expected to have the status "400"
    And the get lines response is expected to have the error "Missing required query parameter: timestamp"


  Scenario Outline: Validate that timestamp is formatted correctly
    When the get lines endpoint is called with the following parameters
      | timestamp   | x | y |
      | <timestamp> | 1 | 1 |
    Then the get lines response is expected to have the status "400"
    And the get lines response is expected to have the error "Wrong format of query parameter: timestamp. Expected format is HH:mm:ss"

    Examples:
      | timestamp |
      | xx:yy:zz  |
      | 10:00     |
      | 100:00:00 |
      | 1000      |
      | 10;00;00  |


  Scenario: Validate that x is a required parameter
    When the get lines endpoint is called with the following parameters
      | timestamp | y |
      | 10:00:00  | 1 |
    Then the get lines response is expected to have the status "400"
    And the get lines response is expected to have the error "Missing required query parameter: x"


  Scenario: Validate that x is a number
    When the get lines endpoint is called with the following parameters
      | timestamp | x | y |
      | 10:00:00  | a | 1 |
    Then the get lines response is expected to have the status "400"
    And the get lines response is expected to have the error "Wrong format of query parameter: x. It must be an integer."


  Scenario: Validate that y is a required parameter
    When the get lines endpoint is called with the following parameters
      | timestamp | x |
      | 10:00:00  | 1 |
    Then the get lines response is expected to have the status "400"
    And the get lines response is expected to have the error "Missing required query parameter: y"


  Scenario: Validate that y is a number
    When the get lines endpoint is called with the following parameters
      | timestamp | x | y |
      | 10:00:00  | 1 | a |
    Then the get lines response is expected to have the status "400"
    And the get lines response is expected to have the error "Wrong format of query parameter: y. It must be an integer."


  Scenario: Get no line because there is no match by coordinate
    When the get lines endpoint is called with the following parameters
      | timestamp | x  | y  |
      | 10:01:00  | 12 | 12 |
    Then the get lines response is expected to have the status "404"
    And the get lines response is expected to have the error "Could not find line for the given coordinates."


  Scenario: Get no line because there is no match by time
    When the get lines endpoint is called with the following parameters
      | timestamp | x | y |
      | 10:00:00  | 1 | 1 |
    Then the get lines response is expected to have the status "404"
    And the get lines response is expected to have the error "Could not find line for the given coordinates and time."


  #TODO there is no test for getting multiple lines as the given data does not provide such a use case, but it is theoretically possible
  Scenario Outline: Get single line successfully
    When the get lines endpoint is called with the following parameters
      | timestamp   | x   | y   |
      | <timestamp> | <x> | <y> |
    Then the get lines response is expected to have the status "200"
    And the get lines response is expected to contain the following data
      | id   | name   |
      | <id> | <name> |

    Examples:
      | timestamp | x | y  | id | name |
      | 10:01:00  | 1 | 1  | 0  | M4   |
      | 10:03:00  | 3 | 1  | 1  | 200  |
      | 10:03:00  | 1 | 4  | 0  | M4   |
      | 10:06:00  | 3 | 4  | 1  | 200  |
      | 10:06:00  | 1 | 7  | 0  | M4   |
      | 10:08:00  | 3 | 7  | 1  | 200  |
      | 10:08:00  | 2 | 9  | 0  | M4   |
      | 10:10:00  | 3 | 11 | 0  | M4   |
      | 10:10:00  | 2 | 9  | 1  | 200  |
      | 10:12:00  | 1 | 10 | 1  | 200  |
      | 10:18:00  | 2 | 9  | 2  | S75  |
      | 10:19:00  | 2 | 12 | 2  | S75  |
      | 10:21:00  | 3 | 11 | 2  | S75  |
      | 10:23:00  | 4 | 9  | 2  | S75  |
      | 10:25:00  | 5 | 7  | 2  | S75  |
