from flask import jsonify
from model.schedule import ScheduleDAO


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

def build_schedule_map_dict(row):
    result = {
        "schedule_id": row[0],
        'date': row[1],
        'tutor_accepted': row[2],
        'tutoree_accepted': row[3],
        'subject_id': row[4],
        'tutor_id': row[5],
        'tutoree_id': row[6]
    }
    return result


class BaseSchedule:

    def create_schedule(self, date, tutor_accepted, tutoree_accepted, subject_name, tutor_id, tutoree_id):
        dao = ScheduleDAO()
        print(date, tutor_accepted, tutoree_accepted, subject_name, tutor_id, tutoree_id)
        schedule = dao.create_schedule(date, tutor_accepted, tutoree_accepted,
                                       subject_name, tutor_id, tutoree_id)
        print('build schedule', build_schedule_map_dict(schedule))
        if schedule:
            return build_schedule_map_dict(schedule), 201
        else:
            return jsonify({ "message": "not able to create schedule"}), 401
