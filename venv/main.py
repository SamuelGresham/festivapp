from flask import Flask, redirect, request
from flask import render_template 
import urllib
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

# Redirects the user to the spotify authentication page
@app.route("/login")
def login():
    # Define parameters for the auth request
    request_body = {
        'response_type': 'code',
        'client_id': "a6d4ca3ba6e24f8db9a617bad5854451",
        'scope': "user-library-read", 
        'redirect_uri': "http://localhost:5001/auth"
    }

    # Redirect the user to Spotify for authentication
    return redirect('https://accounts.spotify.com/authorize?' + urllib.parse.urlencode(request_body))

# The callback path for spotify auth
@app.route("/auth", methods=["GET"])
def auth():
    if request.args.get("error") is not None: # if the user has not passed auth 
        return "An error occurred"
    else: # if the user has passed auth, redirect to get the spotify token 
        return "The key is " + request.args["code"]

