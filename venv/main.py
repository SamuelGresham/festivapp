from flask import Flask
from flask import render_template
import spotipy
from spotipy.oauth2 import SpotifyOAuth 

# Initialise flask app with name app. 
# Passing name of file as the application name 
app = Flask(__name__)

# Main path 
# Passes in the login page 
@app.route("/")
def index():
    return render_template('index.html.j2')
