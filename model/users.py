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


class UsersDAO:
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

        cursor.execute(query, (first_name, last_name, email,
                               password, None, None, None, user_type,))
        user_id = cursor.fetchone()[0]
        print(user_id)
        self.conn.commit()
        return user_id

    def authenticate_user(self, email, ):
        cursor = self.conn.cursor()
        query = "select user_id, password, user_type, first_name, last_name from users where email=%s;"
        cursor.execute(query, (email,))
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

    def get_all_tutors(self):
        cursor = self.conn.cursor()
        query = "select * from users where user_type='tutor';"
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result

    def get_all_tutoree(self):
        cursor = self.conn.cursor()
        query = "select * from tutor;"
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result

    def get_user_by_id(self, user_id):
        cursor = self.conn.cursor()
        query = "select * from users where user_id = %s;"
        cursor.execute(query, (user_id,))
        result = []
        for row in cursor:
            result.append(row)
        print(result)
        return result

    def delete_user_by_id(self, user_id, user_type):
        cursor = self.conn.cursor()
        # query = "update follows set is_followed = false where follower_id = %s; update users set is_active = false where user_id = %s returning user_id;"
        # query = "with new_user as (insert into users(first_name, last_name, email, password, college, phone_number, about_me, user_type)" \
        #         "values (%s, %s, %s, %s, %s, %s, %s, %s) returning user_id as id) insert into tutor (user_id) " \
        #         "select id from new_user returning user_id;"

        query = ""
        if user_type == "tutor":
            query = "with deleted_tutor as (delete from tutor where user_id=%s returning user_id) " \
                    "delete from users where user_id=user_id returning user_id"
        else:
            query = "with deleted_tutoree as (delete from tutoree where user_id=%s returning user_id) " \
                    "delete from users where user_id=user_id returning user_id"
        cursor.execute(query, (user_id,))
        row = cursor.fetchone()
        if row is None:
            return False

        print(row)
        self.conn.commit()
        return row[0]

    def update_user_by_id(self, first_name, last_name, email, password, user_id):
        cursor = self.conn.cursor()
        query = "update users set first_name = %s, last_name = %s, password = %s, email = %s where user_id = %s returning user_id;"
        cursor.execute(query, (first_name, last_name,
                               password, email, user_id,))
        result = cursor.fetchone()[0]
        self.conn.commit()
        return result
