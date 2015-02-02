'''
Generic routes
E.g. Favicon, static file serving.
'''
import os
from redditDIY import app
from flask import jsonify
from flask import request
from flask import send_file, make_response, abort
from redditDIY.common.utils import in_directory, RegexConverter

# @app.route('/favicon.ico')
# def favicon():
# 	return send_file(app.config['FRONTEND_LOCATION'] + '/assets/img/favicon.ico')

app.url_map.converters['regex'] = RegexConverter
@app.route('/')
@app.route('/<regex(".*"):catch_url>')
def angular_redirect(catch_url=''):
	# api calls go to other routes
	if catch_url[:3] == 'api':
		return

	# Everything not a static file gets deferred to angular index.html
	ext = os.path.splitext(catch_url)[1]
	
	if ext not in app.config['FRONTEND_ALLOWED_FILETYPES']:
		return make_response(open(app.config['FRONTEND_LOCATION'] + '/index.html').read())
	
	# Static files that are allowed are yielded
	s_file = app.config['FRONTEND_LOCATION'] + '/' + catch_url
	if in_directory(s_file, app.config['FRONTEND_LOCATION']):
		return send_file(s_file)
	else:
		abort(404)