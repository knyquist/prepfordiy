from redditDIY import app
from flask import jsonify
from datetime import datetime
from flask import request 
from werkzeug.datastructures import MultiDict
from io import StringIO
from pprint import pprint
from sqlalchemy import or_, and_, desc, asc

import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
#from gensim import corpora, models, similarities
import string
import os
from scipy.sparse.csr import csr_matrix


def load_sparse_csr(filename):
    loader = np.load(filename)
    return csr_matrix((  loader['data'], loader['indices'], loader['indptr']),
                         shape = loader['shape'])

cwd = os.getcwd()
comments_path = os.path.join(cwd, "..", "data", "diy_comments.pkl")
threads_path = os.path.join(cwd, "..", "data", "diy_posts.pkl")
imgur_path = os.path.join(cwd, "..", "data", "imgur_content.pkl")
tfidf_path = os.path.join(cwd, "..", "data", "tfidf.npz")

comments =  pd.read_pickle(comments_path)
threads = pd.read_pickle(threads_path)
imgur = pd.read_pickle(threads_path)
tfidf = load_sparse_csr(tfidf_path)

@app.route('/api/diy', methods=['GET'])
def get_diy():
	titles = []; indices = []; ix = 0
	for title in threads['title']:
		titles.append( title )
		indices.append(ix); ix+=1

	links = []
	for link in threads['post_url']:
		links.append( link )

	comments = []
	for comment_link in threads['comments_url']:
		comments.append( comment_link )

	authors = []
	for author in threads['author']:
		authors.append( author )

	num_comments = []
	for num in threads['num_comments']:
		num_comments.append( num )

	r = zip(titles, links, indices, comments, authors, num_comments)

	return jsonify(**{
				'meta': {
					'code': 200
				},
				'response': {
					'threads': [ {'titles': p[0],
								  'links': p[1],
								  'indices': p[2],
								  'comments': p[3],
								  'authors': p[4],
								  'num_comments': p[5]} for p in r ] 

				}
			})

@app.route('/api/diy/<post_id>', methods=['GET'])
def find_similar_posts(post_id):
	post_id = int(post_id);
	similarity = cosine_similarity(tfidf[post_id], tfidf)
	similarity = similarity.tolist()

	scores = []
	index = 0
	for item in similarity[0]:
	    scores.append( [index, item] )
	    index+=1

	posts = sorted(scores, key=lambda x: x[1], reverse=True)[0:6]

	top_posts = []
	for post in posts:
		top_posts.append(post[0])
	print top_posts

	titles = []
	imgur_links = []
	comment_links = []
	authors = []
	for index in top_posts:
		titles.append( threads['title'][index])
		imgur_links.append( threads['post_url'][index])
		comment_links.append( threads['comments_url'][index] )
		authors.append( threads['author'][index])

	r = zip(titles, imgur_links, authors, comment_links)

	return jsonify(**{
				'meta': {
					'code': 200
				},
				'response': {
					'threads': [ {'titles': p[0],
								  'links': p[1],
								  'authors': p[2],
								  'comments': p[3]} for p in r ] 

				}
			})

