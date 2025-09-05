***Settings***
Library    SeleniumLibrary

***Test Cases***
Open Chrome and Navigate to Google
    Open Browser    https://www.google.com    chrome
    Maximize Browser Window
    Sleep    3s
    Close Browser

My test case
    Log    Hello, Robot Framework!
My second test case
    Log    This is another test case.
    
*** Keywords ***
Example Keyword
    Log    This is an example keyword.
    Sleep    1s
    Log    Keyword execution completed.

