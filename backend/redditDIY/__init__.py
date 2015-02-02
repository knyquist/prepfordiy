from flask import Flask, request, Response

app = Flask(__name__)
app.config.from_object('redditDIY.settings')
app.url_map.strict_slashes = False

# All features go here
import redditDIY.common
import redditDIY.diy