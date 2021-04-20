# print('__file__={0:<35} | __name__={1:<20} | __package__={2:<20}'.format(__file__,__name__,str(__package__)))

# import controller.package.imports











from flask import Flask, request, jsonify
# from .model.user import UserDAO
# import api.controller.user
from .handlers.user import BaseUser
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)


@app.route('/')
def test():
    return 'Hello!'

@app.route('/api/users', methods=['POST', 'GET'])
def handle_users():
    if request.method == 'GET':
        return BaseUser().get_all_users()
    if request.method == 'POST':
        user = request.get_json()
        email = user['email']
        password = user['password']
        first_name = user['first_name']
        last_name = user['last_name']
        pw_hash = generate_password_hash(password)
        return BaseUser().create_user(first_name, last_name, email, pw_hash)
    else:
        return jsonify("Method Not Allowed"), 405

# @app.route('/DackApp/users/<int:user_id>', methods=['GET', 'PUT', 'DELETE'])
# def handleUser(user_id):
#     if request.method == 'GET':
#         return BaseUser().getUserById(user_id)
#     if request.method == 'PUT':
#         user = request.get_json()
#         first_name = user['FirstName']
#         last_name = user['LastName']
#         email = user['Email']
#         password = user['Password']
#         pw_hash = generate_password_hash(password)
#         return BaseUser().updateUserById(first_name, last_name, email, pw_hash, user_id)
#     if request.method == 'DELETE':
#         return BaseUser().deleteUserById(user_id)
#     else:
#         return jsonify("Method Not Allowed"), 405
#
# @app.route('/api/auth/login', methods=['POST'])
# def handle_user_authentication():
#     if request.method == 'GET':
#         user = request.get_json()
#         email = user['email']
#         password = user['password']
#         pw_hash = generate_password_hash(password)
#         pw_matched = check_password_hash(pw_hash, password)
#         return BaseUser().authenticate_user(email, pw_matched)
#     else:
#         return jsonify("Method Not Allowed"), 405


if __name__ == '__main__':
    app.run(debug=True)
