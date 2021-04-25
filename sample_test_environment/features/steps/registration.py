from behave import *

from test_pom import LoginPage, RegisterPage

use_step_matcher("re")


@given("I visit the login page")
def step_impl(context):
    """
    :type context: behave.runner.Context
    """
    login_page = LoginPage(context.driver)
    login_page.visit()


@when("I click the tutor registration link")
def step_impl(context):
    """
    :type context: behave.runner.Context
    """
    login_page = LoginPage(context.driver)
    login_page.tutor_register.click()


@then("I am at the tutor registration page")
def step_impl(context):
    """
    :type context: behave.runner.Context
    """
    tutor_register = RegisterPage(context.driver, user_type='tutor')
    assert context.driver.current_url == tutor_register.page_url()


@when("I click the student registration link")
def step_impl(context):
    """
    :type context: behave.runner.Context
    """
    login_page = LoginPage(context.driver)
    login_page.student_register.click()


@then("I am at the student registration page")
def step_impl(context):
    """
    :type context: behave.runner.Context
    """
    student_register = RegisterPage(context.driver, user_type='student')
    assert context.driver.current_url == student_register.page_url()
