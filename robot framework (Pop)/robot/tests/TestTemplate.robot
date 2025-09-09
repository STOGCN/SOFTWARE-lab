***Settings***
Test Template    Check Length

***Test Cases***    STPING    EXPECTED LENGTH
Case1   Hello    5
Case2   Robot Framework    15
Case3   Testing    7

***Keywords***
Check Length
    [Arguments]    ${string}    ${expected_length}
    ${n}=    Get Length    ${string}
    Should Be Equal As Integers    ${n}    ${expected_length}