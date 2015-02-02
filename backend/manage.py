import os
import json
import argparse
import requests
from datetime import datetime

from redditDIY import app
from redditDIY.common.db import db
from redditDIY.users.profile.models import Profile
from redditDIY.settings import *
from redditDIY.users.models import *

def create_db():
	with app.app_context():
		db.create_all()
		db.session.commit()
		# user_datastore.create_role(name='Peon', description='Generic user role')
		# user_datastore.create_role(name='Admin', description='Admin user role')
		# db.session.commit()
		
		# user = user_datastore.create_user(email='mike@michaelsouza.com',
		# 								  password='secret',
		# 								  name='Mike',
		# 								  location='The Gibson')
		# user.confirmed_at = datetime.utcnow()
		# user_datastore.add_role_to_user(user, user_datastore.find_role('Peon'))
		# user_datastore.add_role_to_user(user, user_datastore.find_role('Admin'))
		# db.session.commit()
		# profile = Profile(user_id=user.id)
		# db.session.add(profile)
		# db.session.commit()

		# user = user_datastore.create_user(email='me@kristofornyquist.com',
		# 								  password='because',
		# 								  name='Kris',
		# 								  location='Fuck off')
		# user.confirmed_at = datetime.utcnow()
		# user_datastore.add_role_to_user(user, user_datastore.find_role('Peon'))
		# user_datastore.add_role_to_user(user, user_datastore.find_role('Admin'))
		# db.session.commit()
		# profile = Profile(user_id=user.id)
		# db.session.add(profile)
		# db.session.commit()

def drop_db():
	db.drop_all()

def main():
	parser = argparse.ArgumentParser(description='Manage redditDIY application.')
	parser.add_argument('command', help='the name of the command you want to run')
	args = parser.parse_args()

	if args.command == 'create_db':
		create_db()

		print("DB created.")
	elif args.command == 'destroy_db':
		drop_db()

		print("DB destroyed.")
	else:
		raise Exception('Invalid command')

if __name__ == '__main__':
	main()