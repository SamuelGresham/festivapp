from flask import Flask
import spotipy
from spotipy.oauth2 import SpotifyOAuth 

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!!</p>"
