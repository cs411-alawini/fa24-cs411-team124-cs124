from flask import Blueprint, jsonify
from ..extensions import db
import sqlalchemy
from ..models.recipe import Recipe

recipe_bp = Blueprint('recipes', __name__)
#Returns a list of all recipes that match user settings
@recipe_bp.route('/recipes', methods=['GET'])
def get_recipes():
    try:
        query = sqlalchemy.text("""
            SELECT Recipe_id, Title, Instructions, Image_name 
            FROM Recipe
            LIMIT 9;
        """)
        results = db.session.execute(query).fetchall()
        recipes = [{
            "id": row[0],
            "title": row[1],
            "instructions": row[2],
            "image_name": row[3]
        } for row in results]
        return jsonify({"recipes": recipes})
    except Exception as e:
        print("Error fetching recipes:", str(e))  # Add logging
        return jsonify({"error": str(e)}), 500

@recipe_bp.route('/recipes/<int:recipe_id>', methods=['GET'])
def get_recipe_details(recipe_id):
    try:
        query = sqlalchemy.text("""
            SELECT Recipe_id, Title, Instructions, Image_name
            FROM Recipe 
            WHERE Recipe_id = :recipe_id
        """)
        result = db.session.execute(query, {'recipe_id': recipe_id}).fetchone()
        
        if not result:
            return jsonify({"error": "Recipe not found"}), 404
            
        recipe = {
            "id": result[0],
            "title": result[1],
            "instructions": result[2],
            "image_name": result[3]
        }
        return jsonify(recipe)
    except Exception as e:
        print("Error fetching recipe details:", str(e))  # Add logging
        return jsonify({"error": str(e)}), 500
