from flask import Flask, redirect, url_for, render_template
from markupsafe import escape

app = Flask(__name__)


@app.route('/')
def index():
    return redirect(url_for('home'))


@app.route('/home/')
@app.route('/home/<int:user_id>/')
def home(user_id=None):
    if user_id is None:  # No user_id provided, send user to login page
        return redirect(url_for('login'))
    return 'Welcome user {}. Home page is currently under development.'.format(escape(user_id))


@app.route('/login')
def login():
    return render_template('login.html')


@app.route('/register')
@app.route('/register/<user_type>')
def register(user_type='student'):
    if user_type == 'tutor':
        return 'Tutor registration page is under development.'
    elif user_type == 'student':
        return 'Student registration page is under development.'
