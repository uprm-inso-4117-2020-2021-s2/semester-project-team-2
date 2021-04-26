import logging
import os
from ezrum import app
from selenium import webdriver


class SeleniumWebDriver:

    def __init__(self):
        self.logger = logging.getLogger('web')
        self.driver_file_extension = '.exe' if os.name == 'nt' else ''
        self.web_driver_dir = os.path.join(app.root_path, 'drivers')
        self.headless_var = os.environ.get('EZRUM_HEADLESS')
        self.browser_var = os.environ.get('EZRUM_TEST_BROWSER')
        if not self.browser_var or self.browser_var == 'chrome':
            self.set_chrome_driver()
        else:
            self.logger.error("Unknown browser specified for test run")
            exit(1)

        self.driver.set_window_size(1280, 960)
        self.driver.maximize_window()

    def set_chrome_driver(self):
        options = webdriver.ChromeOptions()
        if self.headless_var is None or self.headless_var == '1':
            options.add_argument("--headless")
        options.add_argument("--no-sandbox")
        options.add_argument('--disable-dev-shm-usage')
        options.add_argument("start-maximized")
        options.add_argument("disable-infobars")
        options.add_argument("--disable-extensions")
        options.add_experimental_option('prefs', {"plugins.always_open_pdf_externally": True})
        service_log_path = os.path.join(self.web_driver_dir, "chromedriver.log".format('log'))
        service_args = ['--verbose', "--log-path=%s" % service_log_path]
        executable_path = os.path.join(self.web_driver_dir, "chromedriver") + self.driver_file_extension
        self.driver = webdriver.Chrome(executable_path=executable_path,
                                       service_args=service_args,
                                       service_log_path=service_log_path, options=options,
                                       desired_capabilities=webdriver.DesiredCapabilities.CHROME)
        self.logger.info("Assigned Chrome webdriver instance to driver variable")

    def get_driver(self):
        return self.driver

    def get_logger(self):
        return self.logger
