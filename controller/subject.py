from flask import jsonify
from model.subject import SubjectDAO


# create table subject(
#     subject_id serial not null primary key,
#     subject_name varchar(20),
#     tutor_id integer references tutor(tutor_id)
# );

class BaseSubject:

    def build_subject_map_dict(self, row):
        result = {
            'subject_id': row[0],
            'subject_name': row[1],
            'tutor_id': row[2],
        }
        return result

    def get_all_subject(self):
        dao = SubjectDAO()
        user_list = dao.get_all_subjects()
        result_list = []
        for row in user_list:
            obj = self.build_subject_map_dict(row)
            result_list.append(obj)
        return jsonify(result_list), 200

    def create_tutor_subject(self, subject_name, price, pricing_rate, description, tutor_id):
        dao = SubjectDAO()
        subject_id = dao.create_tutor_subject(subject_name, price, pricing_rate, description, tutor_id)
        message = {}
        if subject_id:
            message['message'] = 'subject successfully created with id = %s' % subject_id
        return jsonify(message), 200

    def get_tutor_subjects(self, tutor_id):
        dao = SubjectDAO()
        user_list = dao.get_tutor_subjects(tutor_id)
        result_list = []
        for row in user_list:
            obj = self.build_subject_map_dict(row)
            result_list.append(obj)
        return jsonify(result_list), 200
