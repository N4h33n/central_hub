from flask import Flask
from flask_cors import CORS
from .routes import create_routes, routes


def create_app():
    app = Flask(__name__)
    app.config['JSON_SORT_KEYS'] = False

    CORS(app, resources={r"/api/*": {"origins": "http://localhost:3001"}}, methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])
    
    app.register_blueprint(routes)
    
    create_routes(app)

    return app