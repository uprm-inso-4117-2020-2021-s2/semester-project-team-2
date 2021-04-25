from urllib.parse import urlparse

from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By


class BaseElement(object):
    def __init__(self, locator, driver):
        self.locator = locator
        self.driver = driver

    def find(self):
        try:
            return self.driver.find_element(*self.locator)
        except NoSuchElementException:
            return None

    def click(self):
        element = self.find()
        if element:
            element.click()
            return element
        else:
            return None

    def is_selected(self):
        element = self.find()
        if element:
            return element.get_attribute("checked")
        else:
            return None

    def get_text(self):
        element = self.find()
        if element:
            if element.tag_name != 'input' and element.tag_name != 'textarea':
                return element.text
            else:
                return element.get_attribute('value')
        else:
            return None

    def innerHTML(self):
        element = self.find()
        return element.text if element else None

    def is_readonly(self):
        element = self.find()
        if element:
            return element.get_attribute('class') == 'readonly' or bool(element.get_attribute('readonly'))
        else:
            return None


class FieldElement(BaseElement):
    def write(self, keys):
        element = self.find()
        if element:
            element.send_keys(keys)
            return element
        else:
            return None

    def clear_field(self):
        el = self.find()
        if el:
            el.clear()
        else:
            return None


class BasePage(object):
    def __init__(self, driver, host='localhost', port=5000):
        self.driver = driver
        self.host = host
        self.port = port

    def page_url(self):
        # Add specific path to page by overriding this method
        return f'http://{self.host}:{self.port}'


class LoginPage(BasePage):
    def __init__(self, driver, **kwargs):
        super(LoginPage, self).__init__(driver, **kwargs)
        self.username = FieldElement((By.ID, 'id_username'), driver)
        self.password = FieldElement((By.ID, 'id_password'), driver)
        self.login_button = BaseElement((By.ID, 'id_login'), driver)
        self.tutor_register = BaseElement((By.ID, 'id_tutor_register'), driver)
        self.student_register = BaseElement((By.ID, 'id_student_register'), driver)

    def page_url(self):
        return super(LoginPage, self).page_url() + '/login'

    def visit(self):
        self.driver.get(self.page_url())

    def login(self, username, password):
        self.username.write(username)
        self.password.write(password)
        self.login_button.click()


class RegisterPage(BasePage):
    def __init__(self, driver, user_type, **kwargs):
        super(RegisterPage, self).__init__(driver, **kwargs)
        self.user_type = user_type

    def page_url(self):
        return super(RegisterPage, self).page_url() + f'/register/{self.user_type}'
