***Settings***
Library    SeleniumLibrary
Library    Collections
Library    OperatingSystem
Library    RequestsLibrary
Resource   ../resources/Keywords.robot


***Variables***
${BASE_URL}    https://www.saucedemo.com/
${BROWSER}     chrome
${VALID_USER}  standard_user
${PASSWORD}    secret_sauce
@{ITEM}        Sauce Labs Backpack  Sauce Labs Bike Light  Sauce Labs Bolt T-Shirt  Sauce Labs Fleece Jacket  Sauce Labs Onesie  Test.allTheThings() T-Shirt (

# ${SEL_USERNAME}      id=user-name
# ${SEL_PASSWORD}      id=password
# ${SEL_LOGIN}         id=login-button
# ${SEL_INVENTORY}     id=inventory_container
# ${SEL_TITLE}         css=.title
# ${SEL_BURGER_BTN}    id=react-burger-menu-btn
# ${SEL_LOGOUT}        id=logout_sidebar_link
# ${SEL_ERROR}         css=.error-message-container


***Keywords***
Open Swag Web
    Open Browser    ${BASE_URL}    ${BROWSER}
    Maximize Browser Window
    Wait Until Page Contains Element    id=login-button    timeout=10s


Login To Swag
    [Arguments]    ${username}=${VALID_USER}    ${password}=${PASSWORD}
    Input Text    id=user-name    ${username}
    Input Text    id=password     ${password}
    Click Button    id=login-button
    Wait Until Element Is Visible    id=inventory_container    timeout=10s
    # Element Should Be Visible    id=inventory_container

Scroll And Add Item To Cart
    [Arguments]    ${Item}
    Click Button    xpath=//div[text()='${Item}']/following-sibling::div/button
    Scroll Element Into View    xpath=//div[text()='${Item}']

Add Product To Cart
    [Arguments]    ${Item}
    Click Button    xpath=//div[text()='${item}']/following-sibling::div/button
    Sleep    1s












*** Test Cases ***
Log in and Add Item to Cart
    [Tags]    smoke
    Open Chrome Incognito
    Input Text    id=user-name    ${VALID_USER}
    Input Text    id=password     ${PASSWORD}
    Click Button    id=login-button
    Wait Until Element Is Visible    id=inventory_container    timeout=10s
    Element Should Be Visible    id=inventory_container
    Click Button    xpath=//div[text()='${ITEM}']/following-sibling::div/button
    Element Should Be Visible    css=.shopping_cart_badge
    Close Browser