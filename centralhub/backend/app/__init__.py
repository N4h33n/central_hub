from flask import Flask
from flask_cors import CORS
from .routes import create_routes, routes


def create_app():
    app = Flask(__name__)

    CORS(app, resources={r"/api/*": {"origins": "http://localhost:3002"}}, methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])
    
    app.register_blueprint(routes)
    
    create_routes(app)

    return app