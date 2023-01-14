# util.py
# This file contains utility functions for completing commonly performed tasks

import urllib
import base64



# Create a GET URL
# url -> the starter API URL (e.g. https://accounts.spotify.com/authorize)
# parameters -> object containing the parameters passed in the GET request
def url_get (url: str, parameters: dict):
    return str(url) + "?" + urllib.parse.urlencode(parameters)

def convert_base64 (string: str): 
    return base64.b64encode(string.encode()).decode()