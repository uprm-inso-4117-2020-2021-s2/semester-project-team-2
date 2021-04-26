from test_pom import LoginPage, RegisterPage


def test_login(selenium_test):
    # Unpack selenium test and create login page pom instance
    driver, port, logger = selenium_test
    login_page = LoginPage(driver)

    # Test tutor register link works as expected
    login_page.visit()
    tutor_register = RegisterPage(driver, user_type='tutor')
    login_page.tutor_register.click()
    assert driver.current_url == tutor_register.page_url()

    # Test student register link works as expected
    login_page.visit()
    student_register = RegisterPage(driver, user_type='student')
    login_page.student_register.click()
    assert driver.current_url == student_register.page_url()



