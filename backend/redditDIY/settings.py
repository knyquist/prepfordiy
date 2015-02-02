import os

DEBUG = True
SECRET_KEY = 'temporary_secret_key'
SQLALCHEMY_DATABASE_URI = 'sqlite:////tmp/redditDIY.db'

FRONTEND_LOCATION = os.path.abspath('../frontend/build')
FRONTEND_ALLOWED_FILETYPES = ['.html', '.js', '.jpg', '.jpeg', '.gif', '.png', '.css', '.mp4', '.webm', '.svg']