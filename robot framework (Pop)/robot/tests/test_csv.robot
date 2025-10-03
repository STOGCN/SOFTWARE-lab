*** Settings ***
Library    OperatingSystem
Library    String

Suite Setup       Init Results To CSV
Test Teardown     Append Results To CSV

*** Variables ***
${results_CSV}    ${CURDIR}/results.csv

*** Keywords ***
Check Length
    [Arguments]    ${text}    ${expected_length}
    ${actual}=    Get Length    ${text}
    # เก็บค่าไว้ใน test variable เพื่อใช้ใน teardown
    Set Test Variable    ${ACTUAL}    ${actual}
    Should Be Equal As Integers    ${actual}    ${expected_length}

Init Results To CSV
    Create File    ${results_CSV}    Test,Expected,Actual,Result\n

Append Results To CSV
    Append To File    ${results_CSV}    ${TEST NAME},${EXPECTED},${ACTUAL},${TEST STATUS}\n  

*** Test Cases ***
Tc-CHECK_CONTENT_LEN-001
    [Documentation]    Check content length of a string
    [Tags]    positive
    [Setup]    Set Test Variable    ${EXPECTED}    5
    ${text}=    Set Variable    Hello
    Check Length    ${text}    ${EXPECTED}
    
Tc-CHECK_CONTENT_LEN-002
    [Documentation]    Check content length of a string - negative case
    [Tags]    negative
    [Setup]    Set Test Variable    ${EXPECTED}    10
    ${text}=    Set Variable    HiHiHiHiHi
    Check Length    ${text}    ${EXPECTED}
