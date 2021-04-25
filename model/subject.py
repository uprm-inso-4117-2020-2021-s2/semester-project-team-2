from config.dbconfig import pg_config
import psycopg2

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


class SubjectDAO:
    def __init__(self):
        connection_url = "dbname=%s user=%s password=%s port=%s host=%s" % (pg_config['dbname'], pg_config['user'],
                                                                            pg_config['password'], pg_config['dbport'],
                                                                            pg_config['dbhost'])
        self.conn = psycopg2.connect(connection_url)

    def create_user(self, first_name, last_name, email, password, user_type):
        cursor = self.conn.cursor()
        query = "with new_user as (insert into users(first_name, last_name, email, " \
                "password, college, phone_number, about_me, user_type)" \
                "values (%s, %s, %s, %s, %s, %s, %s, %s) returning user_id as id) insert into tutor (user_id) " \
                "select id from new_user returning user_id;"

        cursor.execute(query, (first_name, last_name, email,
                               password, None, None, None, user_type,))
        user_id = cursor.fetchone()[0]
        self.conn.commit()
        return user_id

    def get_all_subjects(self):
        cursor = self.conn.cursor()
        query = "select * from subject;"
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result

    def create_tutor_subject(self, subject_name, price, pricing_rate, description, tutor_id):
        cursor = self.conn.cursor()

        # getting the subject_id that represents the given subject name
        id_query = "select subject_id from subject where subject_name=%s;"
        cursor.execute(id_query, (subject_name,))
        subject_id = cursor.fetchone()[0]
        print(subject_id)

        # creating user, subject relationship
        query = "insert into instructs(tutor_id, price, pricing_rate, description, subject_id)" \
                "values(%s, %s, %s, %s, %s) returning tutor_id;" \
                "select * from subject natural inner join instructs where tutor_id=%s;"
        print(tutor_id)
        cursor.execute(query, (tutor_id, price, pricing_rate,
                               description, subject_id, tutor_id,))
        subject = cursor.fetchone()
        print('subject', subject)
        self.conn.commit()
        return subject
        # tutor_id = cursor.fetchone()[0]
        # print('tutor_id', tutor_id)
        # self.conn.commit()
        # return tutor_id

    def get_tutor_subjects(self, tutor_id):
        cursor = self.conn.cursor()
        query = "select * from subject natural inner join instructs where tutor_id=%s;"
        cursor.execute(query, (tutor_id,))
        result = []
        for row in cursor:
            result.append(row)
        return result
