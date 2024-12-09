from flask import Blueprint, request, jsonify
from ..extensions import db
import sqlalchemy
from sqlalchemy import *
from ..models.recipe import Recipe

recipe_bp = Blueprint('recipes', __name__)
#Returns a list of all recipes that match user settings
@recipe_bp.route('/recipes', methods=['GET'])
def get_home_recipes():
    try:
        stored_proc = text("""
            CALL GetPriceCalorie;
        """)
        results = db.session.execute(stored_proc).fetchall()
        recipes = [{
            "id": row[0],
            "title": row[1],
            "calories": row[2],
            "price": row[3]
        } for row in results]
        return jsonify({"recipes": recipes})
    except Exception as e:
        print("Error fetching recipes:", str(e))  # Add logging
        return jsonify({"error": str(e)}), 500
    
@recipe_bp.route('/recipes/<int:user_id>', methods=['GET'])
def get_recipes_user_settings(user_id):
    try:
        #need to implement request
        print(user_id)
        query = sqlalchemy.text("""
            SELECT DISTINCT Recipe_id, Title, Instructions, Image_name FROM Users 
            NATURAL JOIN Recipe NATURAL JOIN Recipe_Ingredient 
            WHERE Recipe.Recipe_id NOT IN 
                (SELECT Recipe_id FROM Recipe 
                NATURAL JOIN Recipe_Ingredient 
                WHERE Ingredient_name LIKE CONCAT('%',Users.Dietary_restrictions, '%') )
            AND User_id = :user_id
            LIMIT 30;
        """)
        results = db.session.execute(query, {'user_id': user_id}).fetchall()
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
