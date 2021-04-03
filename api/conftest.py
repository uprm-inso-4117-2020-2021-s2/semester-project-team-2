import pytest
import socket
import threading
from wsgiref import simple_server
from wsgiref.simple_server import WSGIRequestHandler
from ezrum import app
from selenium_driver_setup import SeleniumWebDriver


# This fixture is used as a base for selenium tests. It creates the driver and assigns an available port to launch
# a live test server
@pytest.fixture(scope="session")
def selenium_test():
    # Create driver
    selenium_webdriver = SeleniumWebDriver()
    driver = selenium_webdriver.get_driver()
    logger = selenium_webdriver.get_logger()

    # Ask OS for a free port.
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(("", 0))
        addr = s.getsockname()
        port = addr[1]
        logger.info('Selenium Test successfully setup')
        yield driver, port, logger

    # Teardown
    driver.quit()


# Used to launch a live server for testing
@pytest.fixture(scope="session", autouse=True)
def live_server(selenium_test):
    server = simple_server.WSGIServer(("", 5000), WSGIRequestHandler)
    server.set_app(app)
    pa_app = threading.Thread(target=server.serve_forever)
    pa_app.start()
    try:
        yield server
    finally:
        server.shutdown()
        pa_app.join()
