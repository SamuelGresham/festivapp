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

@app.route("/login")
def login():
    client_id="a6d4ca3ba6e24f8db9a617bad5854451"
    client_secret="3451c5e4674649bf937ab0ffba583cbd"
    redirect_uri="localhost:5001/auth"
    scope="user-library-read"

    sp = spotipy.Spotify(auth_manager=SpotifyOAuth(scope=scope,client_id=client_id,client_secret=client_secret,redirect_uri=redirect_uri))

    results = sp.current_user_saved_tracks()
    for idx, item in enumerate(results['items']):
        track = item['track']
        print(idx, track['artists'][0]['name'], " – ", track['name'])
    return "done?"

@app.route("/auth")
def auth():
    return("yay")

