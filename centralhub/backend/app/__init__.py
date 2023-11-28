from flask import Flask
from .routes import create_routes


def create_app():
    app = Flask(__name__, static_url_path='/static', static_folder='static')


    create_routes(app)

    return app