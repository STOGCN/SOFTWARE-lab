*** Settings ***


Suite Setup       Log    === Suite Setup ===
Suite Teardown    Log    === Suite Teardown ===

Library    Collections
Library    OperatingSystem
Library    RequestsLibrary
Resource   ../resources/Keywords.robot


*** Variables ***
${a}        a
@{t}        1    2    3
&{dict1}    a=1    b=2
@{Fruits}   apple    banana    orange

*** Test Cases ***

FILE options
    Create File   testfile.txt    This is a test file.
    ${content}=    Get File    testfile.txt
    Log File    testfile.txt
    Remove File    testfile.txt
    File Should Not Exist    testfile.txt

LIST & DICTIONARY
    @{list1}=    Create List    1    2    3
    Append To List    ${list1}    4
    List Should Contain Value    ${list1}    2

    ${value}=    Get From List    ${list1}    1

IF ELSE
    ${value}=    Set Variable    10
    IF    ${value} > 5
        Log    Value is greater than 5
    ELSE IF    ${value} == 5
        Log    Value is equal to 5
    ELSE
        Log    Value is less than 5
    END

FOR LOOP
    @{items}=    Create List    item1    item2    item3
    FOR    ${item}    IN    @{items}
        Log    Current item: ${item}
    END

# TRY EXCEPT
#     TRY
#         Log    Trying to divide by zero
#         ${result}=    Evaluate    1 / 0
#         Log    Result: ${result}
#     EXCEPT    ZeroDivisionError
#         Log    Caught a division by zero error
#     END

Access List
    Log    First fruit: ${Fruits}[0]
    Log    Last fruit: ${Fruits}[-1]
    
    Append To List    ${Fruits}    orange
    Insert Into List    ${Fruits}    1    grape
    Remove From List    ${Fruits}    1
    Log Many    ${Fruits}

Case1
    Log    This is case 1
    Log    ${a}
    Log Many    ${t}
    Log    ${dict1}

Test Test1
    Log    This is Test1
