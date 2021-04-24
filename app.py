from flask import Flask, request, jsonify, make_response
from controller.users import BaseUsers
from controller.subject import BaseSubject
from flask_cors import CORS
from werkzeug.security import generate_password_hash

app = Flask(__name__)
CORS(app)


# def build_actual_response(response):
#     response.headers.add("Access-Control-Allow-Origin", "*")
#     return response

@app.route('/api/users', methods=['POST', 'GET', 'DELETE'])
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
        # user_type = user['user_type']
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
        return BaseUsers().authenticate_user(email, password)
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

# FOR TESTING PURPOSES
@app.route('/api/users/<string:email>', methods=['GET'])
def handle_user_by_email(email):
    if request.method == 'GET':
        # return build_actual_response(BaseUsers().get_user_id_by_email(email))
        return BaseUsers().get_user_id_by_email(email)
    else:
        return jsonify("Method Not Allowed"), 405

if __name__ == '__main__':
    app.run(debug=True)
