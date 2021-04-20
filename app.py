from flask import Flask, request, jsonify
from controller.users import BaseUsers
from controller.subject import BaseSubject
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)


@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/api/users', methods=['POST', 'GET'])
def handle_users():
    if request.method == 'GET':
        return BaseUsers().get_all_users()
    if request.method == 'POST':
        user = request.get_json()
        first_name = user['first_name']
        last_name = user['last_name']
        email = user['email']
        password = user['password']
        user_type = user['user_type']
        pw_hash = generate_password_hash(password)
        return BaseUsers().create_user(first_name, last_name, email, pw_hash, user_type)
    else:
        return jsonify("Method Not Allowed"), 405

@app.route('/api/users/<int:user_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_user(user_id):
    if request.method == 'GET':
        return BaseUsers().get_user_by_id(user_id)
    if request.method == 'PUT':
        user = request.get_json()
        first_name = user['first_name']
        last_name = user['last_name']
        email = user['email']
        password = user['password']
        user_type = user['user_type']
        pw_hash = generate_password_hash(password)
        return BaseUsers().update_user_by_id(first_name, last_name, email, pw_hash, user_id)
    if request.method == 'DELETE':
        user = request.get_json()
        user_type = user['user_type']
        return BaseUsers().delete_user_by_id(user_id, user_type)
    else:
        return jsonify("Method Not Allowed"), 405

@app.route('/api/tutors', methods=['GET'])
def handle_tutors():
    if request.method == 'GET':
        return BaseUsers().get_all_tutors()
    else:
        return jsonify("Method Not Allowed"), 405

@app.route('/api/auth/login', methods=['POST'])
def handle_user_authentication():
    if request.method == 'POST':
        user = request.get_json()
        email = user['email']
        password = user['password']
        pw_hash = generate_password_hash(password)
        pw_matched = check_password_hash(pw_hash, password)
        print('It always returns true, needs testing')
        print(pw_matched)
        # return BaseUsers().authenticate_user(email, pw_matched)
        return jsonify(pw_matched), 405
    else:
        return jsonify("Method Not Allowed"), 405

@app.route('/api/subjects', methods=['GET'])
def handle_subjects():
    if request.method == 'GET':
        return BaseSubject().get_all_subject()
    else:
        return jsonify("Method Not Allowed"), 405

@app.route('/api/subjects/<int:tutor_id>', methods=['GET', 'POST'])
def handle_subject(tutor_id):
    if request.method == 'GET':
        return BaseSubject().get_tutor_subjects(tutor_id)
    if request.method == 'POST':
        subject = request.get_json()
        subject_name = subject['subject_name']
        price = subject['price']
        pricing_rate = subject['pricing_rate']
        description = subject['description']
        return BaseSubject().create_tutor_subject(subject_name, price, pricing_rate, description, tutor_id)
    else:
        return jsonify("Method Not Allowed"), 405

if __name__ == '__main__':
    app.run(debug=True)
