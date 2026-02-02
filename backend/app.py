from flask import Flask
from routes.fighters import fighter_bp
from flask_cors import CORS
import os



def create_app():
    app = Flask(__name__)
    CORS(app)  # allow all origins
    app.register_blueprint(fighter_bp, url_prefix="/fighters")
    return app


if __name__ == "__main__":
    app = create_app()
    port = int(os.environ.get("PORT", 5000))  # default 5000 for local dev
    app.run(host="0.0.0.0", port=port, debug=False)