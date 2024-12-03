from flask import Flask
from flask_cors import CORS
from .extensions import db
from .config import Config
from .routes.recipe_routes import recipe_bp
from .routes.user_routes import user_bp 
from .routes.user_setting_routes import settings_bp
from .routes.meal_plan_routes import meal_plan_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app, 
         origins=['http://localhost:5173'],
         methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
         allow_headers=["Content-Type", "Authorization"],
         supports_credentials=True)
    db.init_app(app)
    app.register_blueprint(user_bp, url_prefix='/api')
    app.register_blueprint(settings_bp, url_prefix='/api')
    app.register_blueprint(recipe_bp, url_prefix='/api')
    app.register_blueprint(meal_plan_bp, url_prefix='/api')
    
    return app