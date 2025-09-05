*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${BASE_URL}    https://www.saucedemo.com/
${BROWSER}     chrome
${VALID_USER}  standard_user
${PASSWORD}    secret_sauce

${SEL_USERNAME}      id=user-name
${SEL_PASSWORD}      id=password
${SEL_LOGIN}         id=login-button
${SEL_INVENTORY}     id=inventory_container
${SEL_TITLE}         css=.title
${SEL_BURGER_BTN}    id=react-burger-menu-btn
${SEL_LOGOUT}        id=logout_sidebar_link
${SEL_ERROR}         css=.error-message-container

*** Keywords ***
Open Chrome Incognito
    ${opts}=    Evaluate    __import__('selenium').webdriver.ChromeOptions()
    Call Method    ${opts}    add_argument    --incognito
    Call Method    ${opts}    add_argument    --start-maximized
    # Call Method    ${opts}    add_argument    --headless=new
    Create Webdriver    Chrome    options=${opts}
    Go To    ${BASE_URL}

*** Test Cases ***
Valid Login and Logout
    [Tags]    smoke
    Open Chrome Incognito
    Input Text    ${SEL_USERNAME}    ${VALID_USER}
    Input Text    ${SEL_PASSWORD}    ${PASSWORD}
    Click Button    ${SEL_LOGIN}
    Wait Until Element Is Visible    ${SEL_INVENTORY}    timeout=10s
    Element Should Be Visible    ${SEL_INVENTORY}
    Click Element    ${SEL_BURGER_BTN}
    Wait Until Element Is Visible    ${SEL_LOGOUT}    timeout=5s
    Click Element    ${SEL_LOGOUT}
    Wait Until Element Is Visible    ${SEL_LOGIN}    timeout=10s
    Element Should Be Visible    ${SEL_LOGIN}
    Close Browser
