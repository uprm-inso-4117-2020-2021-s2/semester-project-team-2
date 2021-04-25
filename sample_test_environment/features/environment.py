import threading
from wsgiref import simple_server
from wsgiref.simple_server import WSGIRequestHandler

from ezrum import app
from selenium_driver_setup import SeleniumWebDriver


def before_all(context):
    selenium_webdriver = SeleniumWebDriver()
    context.driver = selenium_webdriver.get_driver()
    context.logger = selenium_webdriver.get_logger()
    context.server = simple_server.WSGIServer(("", 5000), WSGIRequestHandler)
    context.server.set_app(app)
    context.pa_app = threading.Thread(target=context.server.serve_forever)
    context.pa_app.start()


def after_all(context):
    context.driver.quit()
    context.server.shutdown()
    context.pa_app.join()
