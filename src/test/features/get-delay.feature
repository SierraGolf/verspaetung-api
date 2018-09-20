Feature: Get delay information for a line


  Scenario: Get no delay information because there is no match by name
    When the get delay endpoint is called for line "foobar"
    Then the get delay response is expected to have the status "404"
    And the get delay response is expected to have the error "Could not find line for the given name."


  #TODO there is no test for getting a line with no delay as the data does not provide that, but it would return 0
  Scenario Outline: Get delay information successfully
    When the get delay endpoint is called for line "<name>"
    Then the get delay response is expected to have the status "200"
    And the get delay response is expected to contain the following data
      | delay   |
      | <delay> |

    Examples:
      | name | delay |
      | M4   | 1     |
      | 200  | 2     |
      | S75  | 10    |