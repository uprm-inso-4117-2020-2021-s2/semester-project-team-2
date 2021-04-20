from flask import jsonify
from model.user import UserDAO


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

class BaseUser:

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

    def create_user(self, first_name, last_name, email, password, user_type):
        dao = UserDAO()
        user_id = dao.create_user(first_name, last_name, email, password, user_type)
        message = {}
        if user_id:
            message['message'] = 'user successfully created with id = %s' % user_id
        return jsonify(message), 200

    def get_all_users(self):
        dao = UserDAO()
        user_list = dao.get_all_users()
        result_list = []
        for row in user_list:
            obj = self.build_user_map_dict(row)
            result_list.append(obj)
        return jsonify(result_list), 200

    get_user_by_id

    def authenticate_user(self, email):
        dao = UserDAO()
        user_id = dao.create_user(email)
        message = {}
        if user_id:
            message['message'] = 'user successfully created with id = %s' % user_id
        return jsonify(message), 201

