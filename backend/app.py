from flask import Flask
from routes.fighters import fighter_bp
from flask_cors import CORS



def create_app():
    app = Flask(__name__)
    CORS(app)  # allow all origins (development only)
    app.register_blueprint(fighter_bp, url_prefix="/fighters")
    return app


if __name__ == "__main__":
    app = create_app()
    app.run()