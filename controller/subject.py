from flask import jsonify
from model.subject import SubjectDAO


# create table subject(
#     subject_id serial not null primary key,
#     subject_name varchar(20),
# );

# create table instructs(
#     tutor_id integer not null references tutor(tutor_id),
#     description varchar(600),
#     price decimal(4,2),
#     pricing_rate varchar(10),
#     subject_id integer not null references subject(subject_id),
#     primary key(tutor_id, subject_id)
# );

class BaseSubject:

    def build_subject_map_dict(self, row):
        result = {
            'subject_id': row[0],
            'subject_name': row[1],
            'tutor_id': row[2],
            'description': row[3],
            'price': str(row[4]),
            'pricing_rate': row[5]
        }
        return result

    def get_all_subject(self):
        dao = SubjectDAO()
        user_list = dao.get_all_subjects()
        result_list = []
        for row in user_list:
            obj = {'subject_id': row[0], 'subject_name': row[1]}
            result_list.append(obj)
        return jsonify(result_list), 200

    def create_tutor_subject(self, subject_name, price, pricing_rate, description, tutor_id):
        dao = SubjectDAO()
        subject = dao.create_tutor_subject(subject_name, price, pricing_rate, description, tutor_id)
        # message = {}
        if subject:
            return self.build_subject_map_dict(subject)
        # return jsonify(message), 204

    def get_tutor_subjects(self, tutor_id):
        dao = SubjectDAO()
        user_list = dao.get_tutor_subjects(tutor_id)
        result_list = []
        for row in user_list:
            obj = self.build_subject_map_dict(row)
            result_list.append(obj)
        return jsonify(result_list), 200
