from flask import jsonify

from config.dbconfig import pg_config
import psycopg2

# create table users(
#     user_id serial primary key,
#     first_name varchar(20),
#     last_name varchar(30),
#     password varchar(30),
#     email varchar(30)
# );


class UsersDAO:
    def __init__(self):

        connection_url = "dbname=%s user=%s password=%s port=%s host=%s" % (pg_config['dbname'], pg_config['user'],
                                                                            pg_config['password'], pg_config['dbport'], pg_config['dbhost'])
        print("conection url:  ", connection_url)
        self.conn = psycopg2.connect(connection_url)

    def create_user(self, first_name, last_name, email, password):
        cursor = self.conn.cursor()
        query = "insert into users (first_name, last_name, password, email) values(%s, %s, %s, %s) returning user_id;"
        cursor.execute(query, (first_name, last_name, password, email))
        user_id = cursor.fetchone()[0]
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
