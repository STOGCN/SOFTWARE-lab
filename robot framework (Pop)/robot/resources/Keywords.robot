*** Keywords ***
Open Chrome Incognito
    ${opts}=    Evaluate    __import__('selenium').webdriver.ChromeOptions()
    Call Method    ${opts}    add_argument    --incognito
    Call Method    ${opts}    add_argument    --start-maximized
    # Call Method    ${opts}    add_argument    --headless=new
    Create Webdriver    Chrome    options=${opts}
    Go To    ${BASE_URL}

Test    
    Log  This is a test keyword.