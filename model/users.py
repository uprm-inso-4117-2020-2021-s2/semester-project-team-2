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

class UserDAO:
    def __init__(self):

        connection_url = "dbname=%s user=%s password=%s port=%s host=%s" % (pg_config['dbname'], pg_config['user'],
                                                                            pg_config['password'], pg_config['dbport'], pg_config['dbhost'])
        print("conection url:  ", connection_url)
        self.conn = psycopg2.connect(connection_url)

    def create_user(self, first_name, last_name, email, password, user_type):
        cursor = self.conn.cursor()
        query = "with new_user as (insert into users(first_name, last_name, email, password, college, phone_number, about_me, user_type)" \
                "values (%s, %s, %s, %s, %s, %s, %s, %s) returning user_id as id) insert into tutor (user_id) " \
                "select id from new_user returning user_id;"

        cursor.execute(query, (first_name, last_name, email, password, None, None, None, user_type,))
        user_id = cursor.fetchone()[0]
        print(user_id)
        self.conn.commit()
        return user_id

    def get_all_users(self):
        cursor = self.conn.cursor()
        query = "select * from users;"
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result

    def authenticate_user(self, email, ):
        cursor = self.conn.cursor()
        query = "select user_id, password, user_type, first_name, last_name from users where email=%s;"
        cursor.execute(query, (email,))
        user_id = cursor.fetchone()[0]
        self.conn.commit()
        return user_id
