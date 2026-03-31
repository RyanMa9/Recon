from flask import Flask
from routes.fighters import fighter_bp
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

FRONTEND_URL = os.getenv("FRONTEND_URL")


def create_app():
    app = Flask(__name__)
    CORS(app, origins=[FRONTEND_URL])  
    app.register_blueprint(fighter_bp, url_prefix="/fighters")
    return app

app = create_app()


if __name__ == "__main__":
    # Only runs locally, not on Railway
    app.run(debug=True)