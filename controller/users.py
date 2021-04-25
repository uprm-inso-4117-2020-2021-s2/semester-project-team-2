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

def build_tutor_subject_map_dict(row):
    print('row', row)
    result = {
        'subject_id': row[0],
        'subject_name': row[1],
        'tutor_id': row[2],
        'description': row[3],
        'price': str(row[4]),
        'pricing_rate': row[5],
    }
    return result


def build_user_map_dict(row):
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
    if len(row) > 9:
        result['tutor_id'] = row[9]

    return result


def build_auth_map_dict(row):
    result = {
        'user_id': row[0],
        'first_name': row[1],
        'last_name': row[2],
        'email': row[3],
        'password': row[4]
    }
    return result


def build_tutor_map_dict(row):
    result = {
        'tutor_id': row[0],
        'user_id': row[1],
    }
    return result


class BaseUsers:

    def create_user(self, first_name, last_name, email, password, user_type):
        dao = UsersDAO()
        user = dao.create_user(first_name, last_name, email, password, user_type)
        # if auth:
        #     return build_user_map_dict(user), 201
        # elif not user:
        #     print('email does not exist', user)
        #     message['message'] = 'email does not exist'
        #     return jsonify(message), 401
        # else:
        #     print('incorrect password', user)
        #     message['message'] = 'incorrect password'
        #     return jsonify(message), 401
        if user:
            return build_user_map_dict(user), 200
        else:
            return 'email already exists', 409

    def authenticate_user(self, email, password):
        dao = UsersDAO()
        auth, user = dao.authenticate_user(email, password)
        print('res', auth, user)
        message = {}
        if auth:
            return build_user_map_dict(user), 201
        elif not user:
            print('email does not exist', user)
            message['message'] = 'email does not exist'
            return jsonify(message), 401
        else:
            print('incorrect password', user)
            message['message'] = 'incorrect password'
            return jsonify(message), 401

    def get_all_users(self):
        dao = UsersDAO()
        print('it eneter succesffullu')
        user_list = dao.get_all_users()
        result_list = []
        for row in user_list:
            obj = build_user_map_dict(row)
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
            obj = build_user_map_dict(row)
            result_list.append(obj)
        return jsonify(result_list), 200

    def get_user_by_id(self, user_id):
        dao = UsersDAO()
        user = dao.get_user_by_id(user_id)
        print()
        return jsonify(build_user_map_dict(user)), 200

    def get_user_id_by_email(self, email):
        dao = UsersDAO()
        user = dao.get_user_id_by_email(email)
        print('user', user, build_user_map_dict(user))
        print(jsonify(build_user_map_dict(user)))
        # return self.build_user_map_dict(user), 200
        return jsonify(build_user_map_dict(user)), 200

    def get_tutorid_by_userid(self, user_id):
        dao = UsersDAO()
        tutor_id = dao.get_tutorid_by_userid(user_id)
        return tutor_id, 200

    def get_tutors_by_subject(self, subject_id):
        dao = UsersDAO()
        tutor_list = dao.get_tutors_by_subject(subject_id)
        result_list = []
        for row in tutor_list:
            obj = build_tutor_subject_map_dict(row)
            result_list.append(obj)
        return jsonify(result_list), 200

