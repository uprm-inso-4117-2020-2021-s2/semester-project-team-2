from flask import jsonify
from model.users import UsersDAO


# create table users(
#     user_id serial primary key,
#     first_name varchar(20),
#     last_name varchar(30),
#     email varchar(30) unique,
#     password varchar(120),
#     college varchar(90),
#     phone_number varchar(14),
#     about_me varchar(400),
#     user_type varchar(10)
# );

# create table tutor(
#   tutor_id serial primary key,
#   user_id integer references users(user_id)
# );

class BaseUsers:

    def build_auth_map_dict(self, row):
        result = {
            'user_id': row[0],
            'first_name': row[1],
            'last_name': row[2],
            'email': row[3],
            'password': row[4]
        }
        return result

    def build_user_map_dict(self, row):
        result = {
            'user_id': row[0],
            'first_name': row[1],
            'last_name': row[2],
            'email': row[3],
            'password': row[4],
            'college': row[5],
            'phone_number': row[6],
            'about_me': row[7],
            'user_type': row[8]
        }
        return result

    def build_tutor_map_dict(self, row):
        result = {
            'tutor_id': row[0],
            'user_id': row[1],
        }
        return result

    def create_user(self, first_name, last_name, email, password, user_type):
        dao = UsersDAO()
        user_id = dao.create_user(first_name, last_name, email, password, user_type)
        message = {}
        if user_id:
            message['message'] = 'user successfully created with id = %s' % user_id
        return jsonify(message), 200

    def authenticate_user(self, email, password):
        dao = UsersDAO()
        user_id = dao.authenticate_user(email, password)
        message = {}
        if user_id:
            message['message'] = 'user successfully created with id = %s' % user_id
        return jsonify(message), 201

    def get_all_users(self):
        dao = UsersDAO()
        user_list = dao.get_all_users()
        result_list = []
        for row in user_list:
            obj = self.build_user_map_dict(row)
            result_list.append(obj)
        return jsonify(result_list), 200

    def delete_user_by_id(self, user_id, user_type):
        dao = UsersDAO()
        uid = dao.delete_user_by_id(user_id, user_type)
        message = {}
        if uid:
            message['message'] = 'user with id = %s successfully deleted' % uid
            return jsonify(message), 200
        else:
            message['message'] = 'user with id = %s does not exist' % user_id
            return jsonify(message), 204

    def get_all_tutors(self):
        dao = UsersDAO()
        user_list = dao.get_all_tutors()
        result_list = []
        for row in user_list:
            obj = self.build_tutor_map_dict(row)
            result_list.append(obj)
        return jsonify(result_list), 200

    def get_user_by_id(self, user_id):
        dao = UsersDAO()
        user = dao.get_user_by_id(user_id)
        user = self.build_user_map_dict(user[0])
        return jsonify(user), 200



