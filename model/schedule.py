from config.dbconfig import pg_config
import psycopg2
from datetime import datetime

# create table schedule(
#     schedule_id serial primary key,
#     date timestamp not null,
#     tutor_accepted boolean default false,
#     tutoree_accepted boolean default false,
#     subject_id integer references subject(subject_id),
#     tutor_id integer not null,
#     tutoree_id integer not null
# );


def to_date(date_str):
    return datetime.strptime(date_str, "%Y-%m-%d").date()


class ScheduleDAO:
    def __init__(self):
        connection_url = "dbname=%s user=%s password=%s port=%s host=%s" % (pg_config['dbname'], pg_config['user'],
                                                                            pg_config['password'], pg_config['dbport'], pg_config['dbhost'])
        print("conection url:  ", connection_url)
        self.conn = psycopg2.connect(connection_url)

    def to_date(date_str):
        return datetime.datetime.strptime(date_str, "%Y-%m-%d").date()

    def create_schedule(self, date, tutor_accepted, tutoree_accepted, subject_name, tutor_id, tutoree_id):
        cursor = self.conn.cursor()
        print(date, tutor_accepted, tutoree_accepted, subject_name, tutor_id, tutoree_id)
        query = "select subject_id from subject where subject_name=%s;"
        cursor.execute(query, (subject_name,))
        subject_id = cursor.fetchone()[0]
        # return subject_id

        query = "insert into schedule (date, tutor_accepted, tutoree_accepted, subject_id, tutor_id, tutoree_id)" \
                "values (%s, %s, %s, %s, %s, %s) returning *;"
        # cursor.execute(query, (date, tutor_accepted, tutoree_accepted, subject_id, tutor_id, tutoree_id,))
        cursor.execute(query, (datetime.now(), tutor_accepted, tutoree_accepted, subject_id, tutor_id, tutoree_id,))
        schedule = cursor.fetchone()
        print(to_date(date))
        print('schedule', schedule)
        # self.conn.commit()

        query = "insert into tutor_schedule(schedule_id, tutor_id) values (%s, %s) returning *;"
        cursor.execute(query, (schedule[0], tutor_id,))
        tutor_schedule = cursor.fetchone()
        print('tutor_schedule', tutor_schedule)

        query = "insert into tutoree_schedule(schedule_id, tutoree_id) values (%s, %s) returning *;"
        cursor.execute(query, (schedule[0], tutoree_id,))
        tutoree_schedule = cursor.fetchone()
        print('tutoree_schedule', tutoree_schedule)

        self.conn.commit()
        return schedule