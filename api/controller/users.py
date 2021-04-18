from flask import jsonify, request
from model.users import UsersDAO


class BaseUsers:

    def build_map_dict(self, row):
        query = "select user_id, blocked_id, is_blocked from blocks;"
        result = {}
        result['user_id'] = row[0]

        return result

    def create_user(self, first_name, last_name, email, password):
        dao = UsersDAO()
        user_id = dao.create_user(first_name, last_name, email, password)
        message = {}
        if user_id:
            message['message'] = 'user successfully created with id = %s' % user_id
        return jsonify(message), 200

    def get_all_users(self):
        dao = UsersDAO()
        user_list = dao.get_all_users()
        result_list = []
        for row in user_list:
            obj = self.build_user_map_dict(row)
            result_list.append(obj)
        return jsonify(result_list), 200

    def authenticate_user(self, email, ):
        dao = UsersDAO()
        user_id = dao.create_user(email)
        message = {}
        if user_id:
            message['message'] = 'user successfully created with id = %s' % user_id
        return jsonify(message), 201

