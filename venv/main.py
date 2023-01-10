from flask import Flask, redirect
from flask import render_template 
import urllib

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
    # redirect_uri="https://www.google.com"
    redirect_uri = "http://localhost:5001"
    scope="user-library-read"

    request_body = {
        'response_type': 'code',
        'client_id': client_id,
        'scope': scope, 
        'redirect_uri': redirect_uri
    }

    return redirect('https://accounts.spotify.com/authorize?' + urllib.parse.urlencode(request_body))

@app.route("/auth")
def auth():
    return("yay")

