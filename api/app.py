from flask import Flask, request, jsonify
from flask_cors import CORS
from controller.users import BaseUsers
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
# apply CORS
CORS(app)


@app.route('/')
def hello():
    return 'Hello, World!'

@app.route('/api/users', methods=['POST', 'GET'])
def handle_users():
    if request.method == 'GET':
        return BaseUsers().get_all_users()
    if request.method == 'POST':
        user = request.get_json()
        email = user['email']
        password = user['password']
        first_name = user['first_name']
        last_name = user['last_name']
        pw_hash = generate_password_hash(password)
        return BaseUsers().create_user(first_name, last_name, email, pw_hash)
    else:
        return jsonify("Method Not Allowed"), 405

@app.route('/DackApp/users/<int:user_id>', methods=['GET', 'PUT', 'DELETE'])
def handleUser(user_id):
    if request.method == 'GET':
        return BaseUsers().getUserById(user_id)
    if request.method == 'PUT':
        user = request.get_json()
        first_name = user['FirstName']
        last_name = user['LastName']
        email = user['Email']
        password = user['Password']
        pw_hash = generate_password_hash(password)
        return BaseUsers().updateUserById(first_name, last_name, email, pw_hash, user_id)
    if request.method == 'DELETE':
        return BaseUsers().deleteUserById(user_id)
    else:
        return jsonify("Method Not Allowed"), 405

@app.route('/api/auth/login', methods=['POST'])
def handle_user_authentication():
    if request.method == 'GET':
        user = request.get_json()
        email = user['email']
        password = user['password']
        pw_hash = generate_password_hash(password)
        pw_matched = check_password_hash(pw_hash, password)
        return BaseUsers().authenticate_user(email, pw_matched)
    else:
        return jsonify("Method Not Allowed"), 405

