**** Settings ****
Library    Collections
Library    JSONLibrary

*** Variables ***
${json_file}    ${CURDIR}/test_data.json

**** Test Cases ****
check json Cases
    Log To Console    ${json_file}

    ${data}=    Load JSON From File    ${json_file}
    ${cases}=    Get From Dictionary    ${data}    cases

    FOR    ${case}    IN    @{cases}
        ${Test}=       Get From Dictionary    ${case}    Test
        ${expected}=   Get From Dictionary    ${case}    Expected
        Check Length   ${Test}    ${expected}
    END

*** Keywords ***
Check Length
    [Arguments]    ${text}    ${expected_length}
    ${actual}=    Get Length    ${text}
    Should Be Equal As Integers    ${actual}    ${expected_length}
