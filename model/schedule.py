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
    return datetime.strptime(date_str, "%Y-%m-%d %H:%M:%S").date()


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
        query = "select subject_id from subject where subject_name=%s;"
        cursor.execute(query, (subject_name,))
        subject_id = cursor.fetchone()[0]

        query = "insert into schedule (date, tutor_accepted, tutoree_accepted, subject_id, tutor_id, tutoree_id)" \
                "values (%s, %s, %s, %s, %s, %s) returning *;"
        cursor.execute(query, (date, tutor_accepted, tutoree_accepted, subject_id, tutor_id, tutoree_id,))
        schedule = cursor.fetchone()

        query = "insert into tutor_schedule(schedule_id, tutor_id) values (%s, %s) returning *;"
        cursor.execute(query, (schedule[0], tutor_id,))

        query = "insert into tutoree_schedule(schedule_id, tutoree_id) values (%s, %s) returning *;"
        cursor.execute(query, (schedule[0], tutoree_id,))

        query = "select schedule.schedule_id, schedule.date, schedule.tutor_accepted, schedule.tutoree_accepted, " \
                "schedule.subject_id, schedule.tutor_id, schedule.tutoree_id, instructs.description, " \
                "instructs.price, instructs.pricing_rate from instructs natural inner join schedule " \
                "natural inner join tutor where instructs.subject_id=%s and tutor.tutor_id=%s;"
        cursor.execute(query, (schedule[4], tutor_id,))
        schedule_result = cursor.fetchone()

        self.conn.commit()
        return schedule_result
